import {EAppRoutes} from './constants'
import AuthController from './controllers/auth.controller'
import {LoginPage} from './pages/auth'
import {ChangePasswordPage} from './pages/changePassword'
import {ChangeProfilePage} from './pages/changeProfile'
import {MessengerPage} from './pages/messenger'
import {ProfilePage} from './pages/profile'
import {RegisterPage} from './pages/registration'
import './styles/main.scss'
import Router from './utils/Router'

window.addEventListener('DOMContentLoaded', async () => {
	Router.use(EAppRoutes.Auth, LoginPage)
		.use(EAppRoutes.Register, RegisterPage)
		.use(EAppRoutes.Messenger, MessengerPage)
		.use(EAppRoutes.Profile, ProfilePage)
		.use(EAppRoutes.ChangePassword, ChangePasswordPage)
		.use(EAppRoutes.ChangeProfile, ChangeProfilePage)

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
