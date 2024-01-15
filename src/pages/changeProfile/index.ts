import {withStore} from '../../utils/Store'
import {TUser} from '../../api/types'
import {Button} from '../../components/button'
import {Input} from '../../components/input'
import {Link} from '../../components/link'
import {EAppRoutes} from '../../constants'
import userController from '../../controllers/user.controller'
import Block from '../../utils/Block'
import {Validator} from '../../utils/Validator'
import template from './index.hbs'
import './index.scss'

interface IChangeProfileProps extends TUser {}

export class ChangeProfilePageBase extends Block<IChangeProfileProps> {
	init() {
		this.children.first_name = new Input({
			name: 'first_name',
			placeholder: 'Имя',
			type: 'text',
			value: this.props.first_name,
			class: 'changeProfile__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changeProfile__form_input', 'name')
				}
			}
		})
		this.children.second_name = new Input({
			name: 'second_name',
			placeholder: 'Фамилия',
			type: 'text',
			value: this.props.second_name,
			class: 'changeProfile__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changeProfile__form_input', 'name')
				}
			}
		})
		this.children.display_name = new Input({
			name: 'display_name',
			placeholder: 'Отображаемое имя',
			type: 'text',
			value: this.props.display_name,
			class: 'changeProfile__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changeProfile__form_input', 'name')
				}
			}
		})
		this.children.login = new Input({
			name: 'login',
			placeholder: 'Логин',
			type: 'text',
			value: this.props.login,
			class: 'changeProfile__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changeProfile__form_input', 'login')
				}
			}
		})
		this.children.email = new Input({
			name: 'email',
			placeholder: 'E-mail',
			type: 'email',
			value: this.props.email,
			class: 'changeProfile__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changeProfile__form_input', 'email')
				}
			}
		})
		this.children.phone = new Input({
			name: 'phone',
			placeholder: 'Телефон',
			type: 'tel',
			value: this.props.phone,
			class: 'changeProfile__form_input',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'changeProfile__form_input', 'phone')
				}
			}
		})
		this.children.button = new Button({
			label: 'Сменить',
			class: 'changeProfile__buttons_signin',
			events: {
				click: () => this.onSubmit()
			}
		})
		this.children.back = new Link({
			to: EAppRoutes.Profile,
			class: 'changeProfile__buttons_register',
			label: 'Назад'
		})
	}

	onSubmit() {
		const values = Object.values(this.children)
			.filter((child) => child instanceof Input)
			.map((child) => [(child as Input).getName(), (child as Input).getValue()])
		const data = Object.fromEntries(values)
		console.log('data :', data)
		userController.changeProfile(data)
	}

	render() {
		return this.compile(template, this.props)
	}
}

const withUser = withStore((state) => ({...state.user}))
export const ChangeProfilePage = withUser(ChangeProfilePageBase)
