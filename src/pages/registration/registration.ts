import {TSignUpData} from '../../api/types'
import AuthController from '../../controllers/auth.controller'
import Block from '../../utils/Block'
import {TValidType, Validator} from '../../utils/Validator'
import router from '../../utils/router/Router'
import template from './index.hbs'
import './registration.scss'

const validate = (input: HTMLInputElement) => {
	const {value, name} = input
	const getType = (): TValidType => {
		switch (name) {
			case 'first_name':
			case 'second_name':
				return 'name'
			case 'login':
				return 'login'
			case 'email':
				return 'email'
			case 'phone':
				return 'phone'

			default:
				return 'password'
		}
	}
	const {isValid, errorMessage} = Validator.validate(getType(), value)

	const errorLabel = document.createElement('label')
	errorLabel.className = 'registration__form_input__errorLabel'
	errorLabel.id = `registration__form_input__errorLabel_${name}`
	errorLabel.htmlFor = name
	errorLabel.textContent = errorMessage
	if (!isValid) {
		input.classList.add('registration__form_input__error')
		if (!document.getElementById(`registration__form_input__errorLabel_${name}`)) {
			input.after(errorLabel)
		}
	} else {
		input.classList.remove('registration__form_input__error')
		document.getElementById(`registration__form_input__errorLabel_${name}`)?.remove()
	}
}

export class RegistrationPage extends Block {
	constructor() {
		super({
			type: 'button',
			onClick: (e: Event) => {
				e.preventDefault()
				router.go('/')
			},

			events: {
				submit: (event: Event) => {
					event.preventDefault()
					const data: {[key: string]: string} = {}
					Array.from(document.getElementsByTagName('input')).forEach((input) => {
						data[input.name] = input.value
						validate(input)
					})
					const isValid = document.getElementsByClassName(
						'registration__form_input__errorLabel'
					).length
					if (!isValid) {
						console.log('data :', JSON.stringify(data))
						AuthController.signUp(data as TSignUpData)
						// render('chats')
					}
				}
			},
			inputs: [
				{
					name: 'first_name',
					placeholder: 'Имя',
					type: 'text',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'second_name',
					placeholder: 'Фамилия',
					type: 'text',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'login',
					placeholder: 'Логин',
					type: 'text',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'email',
					placeholder: 'E-mail',
					type: 'email',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'phone',
					placeholder: 'Телефон',
					type: 'tel',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'password',
					placeholder: 'Пароль',
					type: 'password',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'passwordRepeat',
					placeholder: 'Пароль ещё раз',
					type: 'password',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				}
			]
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
