import {TUser} from '../../api/types'
import {Button} from '../../components/button'
import {Link} from '../../components/link'
import {ProfileAvatar} from '../../components/profileAvatar'
import {ProfileListItem} from '../../components/profileListItem/profile.listItem'
import {EAppRoutes, resourcesUrl} from '../../constants'
import authController from '../../controllers/auth.controller'
import Block from '../../utils/Block'
import {withStore} from '../../utils/Store'
import template from './index.hbs'
import './index.scss'

interface IProfileProps extends TUser {}

const userFields = [
	'id',
	'first_name',
	'second_name',
	'display_name',
	'login',
	'email',
	'phone'
] as (keyof TUser)[]

class ProfilePageBase extends Block<IProfileProps> {
	init() {
		this.children.back = new Link({
			to: EAppRoutes.Messenger,
			label: 'Назад',
			class: 'profile__backbtn'
		})
		this.children.fields = userFields.map(
			(name) => new ProfileListItem({key: name, value: this.props[name].toString()})
		)
		this.children.avatar = new ProfileAvatar({
			src: resourcesUrl + this.props.avatar
		})
		this.children.changePass = new Link({
			to: EAppRoutes.ChangePassword,
			label: 'Сменить пароль',
			class: 'profile__buttons_pass'
		})
		this.children.changeData = new Link({
			to: EAppRoutes.ChangeProfile,
			label: 'Сменить данные',
			class: 'profile__buttons_pass'
		})
		this.children.logout = new Button({
			label: 'Выйти',
			class: 'profile__buttons_logout',
			events: {
				click: () => {
					authController.logOut()
				}
			}
		})
	}

	protected componentDidUpdate(_oldProps: IProfileProps, newProps: IProfileProps) {
		;(this.children.fields as ProfileListItem[]).forEach((field, i) => {
			field.setProps({value: newProps[userFields[i]]?.toString()})
		})
		this.children.avatar = new ProfileAvatar({
			src: resourcesUrl + this.props.avatar
		})
		return true
	}

	render() {
		return this.compile(template, this.props)
	}
}

const withUser = withStore((state) => ({...state.user}))
export const ProfilePage = withUser(ProfilePageBase as typeof Block)
