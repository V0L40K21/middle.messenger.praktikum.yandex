import Block from '../../utils/Block'
import {Validator} from '../../utils/Validator'
import {render} from '../../utils/render'
import './auth.scss'
import template from './index.hbs'

const validate = (input: HTMLInputElement) => {
	const {value, name} = input
	const {isValid, errorMessage} = Validator.validate(
		name === 'login' ? 'login' : 'password',
		value
	)

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

const addBlurListeners = () => {
	const loginInput = document.getElementById('login') as HTMLInputElement
	const passwordInput = document.getElementById('password') as HTMLInputElement

	loginInput.addEventListener('blur', () => {
		validate(loginInput)
	})

	passwordInput.addEventListener('blur', () => {
		validate(passwordInput)
	})
}

export class Auth extends Block {
	constructor() {
		super({
			type: 'button',
			onClick: (e: Event) => {
				e.preventDefault()
				render('registration')
			},

			events: {
				submit: (event: Event) => {
					event.preventDefault()
					const data: {[key: string]: string} = {}
					Array.from(document.getElementsByTagName('input')).forEach(
						(input) => {
							data[input.name] = input.value
							validate(input)
						}
					)
					const isValid = document.getElementsByClassName(
						'auth__form_input__errorLabel'
					).length
					if (!isValid) {
						console.log('data :', JSON.stringify(data))
						render('registration')
					}
				}
			},
			inputs: [
				{
					name: 'login',
					placeholder: 'Логин',
					type: 'text',
					onBlur: addBlurListeners
				},
				{
					name: 'password',
					placeholder: 'Пароль',
					type: 'password',
					onBlur: addBlurListeners
				}
			]
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
