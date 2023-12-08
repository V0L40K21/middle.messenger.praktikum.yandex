import Block from '../../utils/Block'
import template from './index.hbs'
import './auth.scss'

export class Auth extends Block {
	constructor() {
		super({
			class: 'auth__form_input',
			inputs: [
				{
					name: 'login',
					placeholder: 'Логин',
					type: 'text'
				},
				{
					name: 'password',
					placeholder: 'Пароль',
					type: 'password'
				}
			]
		})
	}
	render() {
		return this.compile(template, this.props)
	}
}
