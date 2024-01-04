import {TSignInData} from '../../api/types'
import {EAppRoutes} from '../../constants'
import AuthController from '../../controllers/auth.controller'
import Block from '../../utils/Block'
import store, {withStore} from '../../utils/Store'
import {Validator} from '../../utils/Validator'
import router from '../../utils/router/Router'
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

type TAuthPageProps = {
	error: string | null
}

class AuthPageBase extends Block {
	constructor(props: TAuthPageProps) {
		super({
			type: 'button',
			onClick: (e: Event) => {
				e.preventDefault()
				router.go('/registration')
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
						'auth__form_input__errorLabel'
					).length
					if (!isValid) {
						console.log('data :', JSON.stringify(data))
						AuthController.signIn(data as TSignInData)
					}
				}
			},
			inputs: [
				{
					name: 'login',
					placeholder: 'Логин',
					type: 'text',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				},
				{
					name: 'password',
					placeholder: 'Пароль',
					type: 'password',
					onBlur: ({target}: Event) => validate(target as HTMLInputElement)
				}
			],
			error: props.error
		})
	}

	init() {
		const {user} = store.getState()
		if (user) {
			router.go(EAppRoutes.Chats)
		}
	}

	render() {
		return this.compile(template, this.props)
	}
}

const connect = withStore((state) => state.error)
export const AuthPage = connect(AuthPageBase)
