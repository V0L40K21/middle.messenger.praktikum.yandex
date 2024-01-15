import {Button} from '../../components/button'
import {Input} from '../../components/input'
import {Link} from '../../components/link'
import {EAppRoutes} from '../../constants'
import authController from '../../controllers/auth.controller'
import Block from '../../utils/Block'
import {Validator} from '../../utils/Validator'
import './index.scss'
import template from './index.hbs'

export class LoginPage extends Block {
	constructor() {
		super({})
	}

	protected init(): void {
		this.children.login = new Input({
			name: 'login',
			placeholder: 'Логин',
			type: 'text',
			class: 'auth__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'auth__form_input', 'login')
				}
			}
		})
		this.children.password = new Input({
			name: 'password',
			placeholder: 'Пароль',
			type: 'password',
			class: 'auth__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'auth__form_input', 'password')
				}
			}
		})
		this.children.button = new Button({
			label: 'Войти',
			class: 'auth__buttons_signin',
			events: {
				click: () => this.onSubmit()
			}
		})
		this.children.link = new Link({
			label: 'Нет аккаунта?',
			to: EAppRoutes.Register,
			class: 'auth__buttons_register'
		})
	}

	onSubmit() {
		const values = Object.values(this.children)
			.filter((child) => child instanceof Input)
			.map((child) => [(child as Input).getName(), (child as Input).getValue()])
		const data = Object.fromEntries(values)
		authController.signIn(data)
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props)
	}
}
