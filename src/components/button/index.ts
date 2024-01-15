import Block from '../../utils/Block'
import template from './Button.hbs'

interface IButtonProps {
	label: string
	class?: string
	type?: 'button' | 'submit'
	events: {
		click: () => void
	}
}

export class Button extends Block<IButtonProps> {
	constructor(props: IButtonProps) {
		super({
			...props,
			type: 'button'
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
