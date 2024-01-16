import {Button} from '../../components/button'
import {Input} from '../../components/input'
import {Link} from '../../components/link'
import {EAppRoutes} from '../../constants'
import authController from '../../controllers/auth.controller'
import Block from '../../utils/Block'
import {Validator} from '../../utils/Validator'
import template from './index.hbs'
import './index.scss'

export class RegisterPage extends Block {
	constructor() {
		super({})
	}

	protected init(): void {
		this.children.firstName = new Input({
			name: 'first_name',
			placeholder: 'Имя',
			type: 'text',
			class: 'registration__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'registration__form_input', 'name')
				}
			}
		})
		this.children.secondName = new Input({
			name: 'second_name',
			placeholder: 'Фамилия',
			type: 'text',
			class: 'registration__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'registration__form_input', 'name')
				}
			}
		})
		this.children.login = new Input({
			name: 'login',
			placeholder: 'Логин',
			type: 'text',
			class: 'registration__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'registration__form_input', 'login')
				}
			}
		})
		this.children.email = new Input({
			name: 'email',
			placeholder: 'E-mail',
			type: 'email',
			class: 'registration__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'registration__form_input', 'email')
				}
			}
		})
		this.children.phone = new Input({
			name: 'phone',
			placeholder: 'Телефон',
			type: 'tel',
			class: 'registration__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'registration__form_input', 'phone')
				}
			}
		})
		this.children.password = new Input({
			name: 'password',
			placeholder: 'Пароль',
			type: 'password',
			class: 'registration__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'registration__form_input', 'password')
				}
			}
		})

		this.children.button = new Button({
			label: 'Создать аккаунт',
			class: 'registration__buttons_signin',
			events: {
				click: () => this.onSubmit()
			}
		})
		this.children.link = new Link({
			label: 'Есть аккаунт',
			to: EAppRoutes.Auth,
			class: 'registration__buttons_register'
		})
	}

	onSubmit() {
		const values = Object.values(this.children)
			.filter((child) => child instanceof Input)
			.map((child) => [(child as Input).getName(), (child as Input).getValue()])
		const data = Object.fromEntries(values)
		authController.signUp(data)
	}

	protected render() {
		return this.compile(template, this.props)
	}
}
