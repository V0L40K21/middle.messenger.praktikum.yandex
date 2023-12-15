import {nanoid} from 'nanoid'

import {EventBus} from './EventBus'

interface IProps {
	events?: Record<string, (event: Event) => void>
	[key: string]: any
}

class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render'
	}

	public id: string

	public props: IProps

	public refs: Record<string, Block> = {}

	private children: Record<string, Block>

	private eventBus: () => EventBus

	private _element: HTMLElement | null = null

	constructor(propsWithChildren: IProps = {} as IProps) {
		this.id = nanoid(6)
		const eventBus = new EventBus()
		const {props, children} = this._getChildrenAndProps(propsWithChildren)
		this.children = children
		this.props = this._makePropsProxy(props) as IProps
		this.eventBus = () => eventBus
		this._registerEvents(eventBus)
		eventBus.emit(Block.EVENTS.INIT)
	}

	private _getChildrenAndProps(childrenAndProps: IProps = {} as IProps) {
		const props: Record<string, any> = {}
		const children: Record<string, Block> = {}
		Object.entries(childrenAndProps).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value
			} else {
				props[key] = value
			}
		})
		return {props, children}
	}

	private _addEvents() {
		const {events} = this.props as {events?: Record<string, () => void>}
		if (events) {
			Object.keys(events).forEach((eventName) => {
				this._element?.addEventListener(eventName, events[eventName])
			})
		}
	}

	private _removeEvents() {
		const {events} = this.props as {events?: Record<string, () => void>}
		if (this._element && events) {
			Object.keys(events).forEach((eventName) => {
				this._element?.removeEventListener(eventName, events[eventName])
			})
		}
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
	}

	private _init() {
		this.init()
	}

	protected init() {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
	}

	private _componentDidMount() {
		this.componentDidMount()
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount()
		})
	}

	protected componentDidMount(): boolean {
		return true
	}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM)
	}

	private _componentDidUpdate() {
		if (this.componentDidUpdate()) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
		}
	}

	protected componentDidUpdate() {
		return true
	}

	setProps = (nextProps: IProps extends object ? IProps : never) => {
		if (!nextProps) {
			return
		}
		Object.assign(this.props, nextProps)
	}

	get element() {
		return this._element
	}

	private _render() {
		const fragment = this.render()
		this._removeEvents()
		const newElement = fragment.firstElementChild as HTMLElement
		if (this._element) {
			this._element.replaceWith(newElement)
		}
		this._element = newElement
		this._addEvents()
	}

	protected compile(template: (context: any) => string, context: any) {
		const contextAndStubs = {...context, __refs: this.refs}
		const html = template(contextAndStubs)
		const temp = document.createElement('template')
		temp.innerHTML = html
		contextAndStubs.__children?.forEach(({embed}: any) => {
			embed(temp.content)
		})
		return temp.content
	}

	protected render(): DocumentFragment {
		return new DocumentFragment()
	}

	getContent() {
		return this.element
	}

	private _makePropsProxy(props: IProps) {
		const self = this
		return new Proxy(props, {
			get(target: IProps, prop: string) {
				const value = target[prop]
				return typeof value === 'function' ? value.bind(target) : value
			},
			set(target: IProps, prop: string, value) {
				const oldTarget = {...target}
				target[prop] = value
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target as IProps)
				return true
			},
			deleteProperty() {
				throw new Error('Нет доступа')
			}
		})
	}

	_createDocumentElement(tagName: string) {
		return document.createElement(tagName)
	}

	show() {
		this.getContent()!.style.display = 'block'
	}

	hide() {
		this.getContent()!.style.display = 'none'
	}
}

export default Block
