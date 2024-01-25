import Block from '../../utils/Block'
import template from './Input.hbs'

interface IInputProps {
	name: string
	type: 'password' | 'text' | 'tel' | 'email'
	class?: string
	value?: string
	placeholder: string
	events?: {
		blur?: (event: FocusEvent) => void
	}
}

export class Input extends Block<IInputProps> {
	constructor(props: IInputProps) {
		super({...props})
	}

	public setValue(value: string) {
		;(this.element as HTMLInputElement).value = value
		return value
	}

	public getName() {
		return (this.element as HTMLInputElement).name
	}

	public getValue() {
		return (this.element as HTMLInputElement).value
	}

	render() {
		return this.compile(template, this.props)
	}
}
