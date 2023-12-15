import Block from '../../utils/Block'
import template from './Input.hbs'

interface IInputProps {
	name: string
	id: string
	type: 'password' | 'text' | 'tel'
	class: string
	placeholder: string
	onBlur: () => void
	events: {
		blur: () => void
	}
}

export class Input extends Block {
	constructor(props: IInputProps) {
		super({
			...props,
			events: {
				blur: props.onBlur
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
