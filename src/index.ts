import {Button} from './components/button'
import {ChatListItem} from './components/chatListItem/ChatListItem'
import {ChatsBottom} from './components/chatsBottom/ChatsBottom'
import {ChatsHeader} from './components/chatsHeader/ChatsHeader'
import {Input} from './components/input'
import {Link} from './components/link'
import {ProfileListItem} from './components/profileListItem/profile.listItem'
import AuthController from './controllers/auth.controller'
import {AuthPage} from './pages/auth/auth'
import {ChatsPage} from './pages/chats/chats'
import {ProfilePage} from './pages/profile/profile'
import {RegistrationPage} from './pages/registration/registration'
import './styles/main.scss'
import {registerComponent} from './utils/registerComponent'
import Router from './utils/router/Router'

export enum EAppRoutes {
	Auth = '/',
	Register = '/registration',
	Chats = '/chats',
	Profile = '/profile'
}

window.addEventListener('DOMContentLoaded', async () => {
	registerComponent('Input', Input)
	registerComponent('Button', Button)
	registerComponent('Link', Link)
	registerComponent('ProfileListItem', ProfileListItem)
	registerComponent('ChatListItem', ChatListItem)
	registerComponent('ChatsHeader', ChatsHeader)
	registerComponent('ChatsBottom', ChatsBottom)

	Router.use(EAppRoutes.Auth, AuthPage)
		.use(EAppRoutes.Register, RegistrationPage)
		.use(EAppRoutes.Chats, ChatsPage)
		.use(EAppRoutes.Profile, ProfilePage)

	let isProtectedRoute = true

	const getPath = () => {
		switch (window.location.pathname) {
			case EAppRoutes.Auth:
			case EAppRoutes.Register: {
				isProtectedRoute = false
				return window.location.pathname
			}
			default: {
				isProtectedRoute = true
				return window.location.pathname
			}
		}
	}

	try {
		await AuthController.fetchProfile()
		Router.start()
		if (!isProtectedRoute) {
			Router.go(getPath())
		}
	} catch (error) {
		Router.start()
		if (isProtectedRoute) {
			Router.go(getPath())
		}
	}
})
