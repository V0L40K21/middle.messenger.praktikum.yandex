import Block from '../Block'
import Helpers from '../Helpers'
import {render} from '../render'

export default class Route {
	private _pathname: string

	private _blockClass: any

	private _block: Block | null

	constructor(pathname: string, view: any) {
		this._pathname = pathname
		this._blockClass = view
		this._block = null
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname
			this.render()
		}
	}

	leave() {
		this._block = null
	}

	match(pathname: string) {
		return Helpers.isEqual(pathname, this._pathname)
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass()
			render(this._block!)
		}
	}
}
