import Block from '../../utils/Block'
import template from './Button.hbs'

interface IButtonProps {
	text: string
	class: string
	type: 'button' | 'submit'
	onClick: () => void
	events: {
		click: () => void
	}
}

export class Button extends Block {
	constructor(props: IButtonProps) {
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
