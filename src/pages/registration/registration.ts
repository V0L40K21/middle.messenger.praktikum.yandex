import Block from '../../utils/Block'
import template from './index.hbs'
import './registration.scss'

export class Registration extends Block {
	constructor() {
		super({
			inputs: [
				{
					name: 'first_name',
					placeholder: 'Имя',
					type: 'text'
				},
				{
					name: 'second_name',
					placeholder: 'Фамилия',
					type: 'text'
				},
				{
					name: 'login',
					placeholder: 'Логин',
					type: 'text'
				},
				{
					name: 'email',
					placeholder: 'E-mail',
					type: 'email'
				},
				{
					name: 'phone',
					placeholder: 'Телефон',
					type: 'tel'
				},
				{
					name: 'password',
					placeholder: 'Пароль',
					type: 'password'
				},
				{
					name: 'passwordRepeat',
					placeholder: 'Пароль ещё раз',
					type: 'password'
				}
			],
			button: {
				class: 'auth__buttons_signin',
				text: 'Войти'
			},
			link: {
				class: 'auth__buttons_register',
				href: '../registration/',
				text: 'Нет аккаунта?'
			}
		})
	}
	render() {
		return this.compile(template, this.props)
	}
}
