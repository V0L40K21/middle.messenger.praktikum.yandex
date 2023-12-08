import Block from '../../utils/Block'
import template from './Input.hbs'

interface IInputProps {
	name: string
	type: 'password' | 'text' | 'tel'
	class: string
	placeholder: string
}

export class Input extends Block {
	constructor(props: IInputProps) {
		super({
			...props
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
