import {Validator} from '../../utils/Validator'
import Block from '../../utils/Block'
import template from './chatsBottom.hbs'
import './index.scss'

const validate = (input: HTMLInputElement) => {
	const {value, name} = input
	const {isValid, errorMessage} = Validator.validate('message', value)

	const errorLabel = document.createElement('label')
	errorLabel.className = 'auth__form_input__errorLabel'
	errorLabel.id = `auth__form_input__errorLabel_${name}`
	errorLabel.htmlFor = name
	errorLabel.textContent = errorMessage
	if (!isValid) {
		input.classList.add('auth__form_input__error')
		if (!document.getElementById(`auth__form_input__errorLabel_${name}`)) {
			input.after(errorLabel)
		}
	} else {
		input.classList.remove('auth__form_input__error')
		document.getElementById(`auth__form_input__errorLabel_${name}`)?.remove()
	}
}

export class ChatsBottom extends Block {
	constructor() {
		super({
			events: {
				submit: (event: Event) => {
					event.preventDefault()
					const data: {[key: string]: string} = {}
					const input = document.getElementById(
						'messageBox'
					) as HTMLInputElement

					data[input.name] = input.value
					validate(input)

					const isValid = document.getElementsByClassName(
						'auth__form_input__errorLabel'
					).length
					if (!isValid) {
						input.value = ''
						console.log('data :', JSON.stringify(data))
					}
				}
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
