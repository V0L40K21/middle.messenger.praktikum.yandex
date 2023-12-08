import Block from '../../utils/Block'
import {render} from '../../utils/render'
import './auth.scss'
import template from './index.hbs'

export class Auth extends Block {
	constructor() {
		super({
			inputs: [
				{
					name: 'login',
					placeholder: 'Логин',
					type: 'text',
					class: 'auth__form_input'
				},
				{
					name: 'password',
					placeholder: 'Пароль',
					type: 'password',
					class: 'auth__form_input'
				}
			],
			button: {
				class: 'auth__buttons_signin',
				text: 'Войти'
			},
			link: {
				class: 'auth__buttons_register',
				text: 'Нет аккаунта?',
				onClick: () => render('registration')
			}
		})
	}
	render() {
		return this.compile(template, this.props)
	}
}
