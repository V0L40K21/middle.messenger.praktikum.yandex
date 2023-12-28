import Block from '../../utils/Block'
import template from './Link.hbs'

interface ILinkProps {
	text: string
	class: string
	onClick: () => void
	events?: {
		click: () => void
	}
}

export class Link extends Block {
	constructor(props: ILinkProps) {
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
