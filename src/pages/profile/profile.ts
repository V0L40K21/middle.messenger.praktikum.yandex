import {EAppRoutes} from '../..'
import authController from '../../controllers/auth.controller'
import Block from '../../utils/Block'
import {withStore} from '../../utils/Store'
import router from '../../utils/router/Router'
import template from './index.hbs'
import './profile.scss'

class ProfilePageBase extends Block {
	constructor() {
		super({
			backClick: () => router.go(EAppRoutes.Chats),
			logOutClick: async () => {
				await authController.logOut()
				router.go(EAppRoutes.Auth)
			},
			data: {
				Почта: 'qwe@',
				Логин: 'abc',
				Имя: 'a',
				Фамилия: 'b',
				'Имя в чате': 'abc',
				Телефон: '+7 (123) 123 12 12'
			}
		})
	}

	render() {
		console.log(this.props)
		return this.compile(template, this.props)
	}
}

const withUser = withStore((state) => ({...state.user}))
export const ProfilePage = withUser(ProfilePageBase)
