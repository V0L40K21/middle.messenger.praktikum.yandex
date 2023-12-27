import {EAppRoutes} from '..'
import API, {AuthApi} from '../api/auth.api'
import {TSignInData, TSignUpData} from '../api/types'
import store from '../utils/Store'
import router from '../utils/router/Router'

class AuthController {
	private readonly api: AuthApi

	constructor() {
		this.api = API
	}

	async signIn(data: TSignInData) {
		try {
			await this.api.signIn(data)
			await this.fetchProfile()
			router.go(EAppRoutes.Chats)
		} catch (error) {
			console.error(error)
		}
	}

	async signUp(data: TSignUpData) {
		try {
			await this.api.signUp(data)
			await this.fetchProfile()
			router.go(EAppRoutes.Chats)
		} catch (error) {
			console.error(error)
		}
	}

	async fetchProfile() {
		const user = await this.api.getProfile()
		store.set('user', user)
	}

	async logOut() {
		try {
			await this.api.logOut()
			router.go(EAppRoutes.Auth)
		} catch (error) {
			console.error(error)
		}
	}
}

export default new AuthController()
