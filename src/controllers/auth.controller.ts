import {EAppRoutes} from '../constants'
import MessageController from './message.controller'
import API, {AuthApi} from '../api/auth.api'
import {TSignInData, TSignUpData} from '../api/types'
import store from '../utils/Store'
import router from '../utils/Router'

class AuthController {
	private readonly api: AuthApi

	constructor() {
		this.api = API
	}

	async signIn(data: TSignInData) {
		try {
			await this.api.signIn(data)
			await this.fetchProfile()
			router.go(EAppRoutes.Messenger)
		} catch (error: any) {
			console.error('signIn error', error)
		}
	}

	async signUp(data: TSignUpData) {
		await this.api
			.signUp(data)
			.then(async () => {
				await this.fetchProfile()
				router.go(EAppRoutes.Messenger)
			})
			.catch((error) => {
				console.log('error :', error)
				throw new Error(error)
			})
	}

	async fetchProfile() {
		const user = await this.api.getProfile()
		if (user) {
			store.set('user', user)
		} else {
			throw new Error('profile not found')
		}
	}

	async logOut() {
		try {
			MessageController.closeAll()
			await this.api.logOut()
			store.set('user', null)
			router.go(EAppRoutes.Auth)
		} catch (error) {
			console.error(error)
		}
	}
}

export default new AuthController()
