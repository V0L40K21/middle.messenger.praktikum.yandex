import {TUser} from '../../api/types'
import {EAppRoutes, resourcesUrl} from '../../constants'
import authController from '../../controllers/auth.controller'
import userController from '../../controllers/user.controller'
import Block from '../../utils/Block'
import {withStore} from '../../utils/Store'
import router from '../../utils/router/Router'
import template from './index.hbs'
import './profile.scss'

type TProfilePageProps = {
	backClick: () => void
	logOutClick: () => Promise<void>
	data: Record<string, any>
} & TUser

class ProfilePageBase extends Block {
	constructor(props: TProfilePageProps) {
		super({
			backClick: () => router.go(EAppRoutes.Chats),
			logOutClick: async () => {
				await authController.logOut()
				router.go(EAppRoutes.Auth)
			},
			changePasswordClick: () => router.go(EAppRoutes.ChangePassword),
			changeAvatar: async () => {
				const {files} = document.querySelector(
					'.profile__avatarWrapper_input-file'
				) as HTMLInputElement
				if (files) {
					const data = new FormData()
					data.append('avatar', files[0])
					await userController.changeAvatar(data)
				}
			},
			avatar: resourcesUrl + props.avatar,
			data: {
				Почта: props.email,
				Логин: props.login,
				Имя: props.first_name,
				Фамилия: props.second_name,
				'Имя в чате': props.display_name,
				Телефон: props.phone
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}

const connect = withStore((state) => ({...state.user}))
export const ProfilePage = connect(ProfilePageBase)
