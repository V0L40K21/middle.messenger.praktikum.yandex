import {TChangePasswordData} from '../../api/types'
import {EAppRoutes} from '../../constants'
import userController from '../../controllers/user.controller'
import Block from '../../utils/Block'
import {Validator} from '../../utils/Validator'
import router from '../../utils/router/Router'
import './changePassword.scss'
import template from './index.hbs'

const validate = (input: HTMLInputElement) => {
	const {value, name} = input
	const {isValid, errorMessage} = Validator.validate('password', value)

	const errorLabel = document.createElement('label')
	errorLabel.className = 'changePassword__form_input__errorLabel'
	errorLabel.id = `changePassword__form_input__errorLabel_${name}`
	errorLabel.htmlFor = name
	errorLabel.textContent = errorMessage
	if (!isValid) {
		input.classList.add('changePassword__form_input__error')
		if (!document.getElementById(`changePassword__form_input__errorLabel_${name}`)) {
			input.after(errorLabel)
		}
	} else {
		input.classList.remove('changePassword__form_input__error')
		document.getElementById(`changePassword__form_input__errorLabel_${name}`)?.remove()
	}
}

export class ChangePasswordPage extends Block {
	constructor() {
		super({
			type: 'button',
			onClick: (e: Event) => {
				e.preventDefault()
				router.go(EAppRoutes.Profile)
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
						'changePassword__form_input__errorLabel'
					).length
					if (!isValid) {
						console.log('data :', JSON.stringify(data))
						userController.changePassword(data as TChangePasswordData)
					}
				}
			},
			inputs: [
				{
					name: 'oldPassword',
					placeholder: 'Старый пароль',
					type: 'password',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'newPassword',
					placeholder: 'Новый пароль',
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
