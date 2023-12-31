import Block from '../../utils/Block'
import template from './Link.hbs'

interface IInputProps {
	text: string
	class: string
	onClick: () => void
	events: {
		click: () => void
	}
}

export class Link extends Block {
	constructor(props: IInputProps) {
		super({
			...props,
			events: {
				click: props.onClick
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
