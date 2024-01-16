import {Button} from '../../components/button'
import {Input} from '../../components/input'
import {Link} from '../../components/link'
import {EAppRoutes} from '../../constants'
import userController from '../../controllers/user.controller'
import Block from '../../utils/Block'
import {Validator} from '../../utils/Validator'
import template from './index.hbs'
import './index.scss'

export class ChangePasswordPage extends Block {
	init() {
		this.children.oldPassword = new Input({
			name: 'oldPassword',
			placeholder: 'Старый пароль',
			type: 'password',
			class: 'changePassword__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changePassword__form_input', 'password')
				}
			}
		})
		this.children.newPassword = new Input({
			name: 'newPassword',
			placeholder: 'Новый пароль',
			type: 'password',
			class: 'changePassword__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changePassword__form_input', 'password')
				}
			}
		})
		this.children.button = new Button({
			label: 'Сменить',
			class: 'changePassword__buttons_signin',
			events: {
				click: () => this.onSubmit()
			}
		})
		this.children.back = new Link({
			to: EAppRoutes.Profile,
			class: 'changePassword__buttons_register',
			label: 'Назад'
		})
	}

	onSubmit() {
		const values = Object.values(this.children)
			.filter((child) => child instanceof Input)
			.map((child) => [(child as Input).getName(), (child as Input).getValue()])
		const data = Object.fromEntries(values)
		userController.changePassword(data)
	}

	render() {
		return this.compile(template, this.props)
	}
}
