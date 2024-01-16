import {TChangePasswordData, TChangeProfileData} from '../api/types'
import API, {UserApi} from '../api/user.api'
import {EAppRoutes} from '../constants'
import router from '../utils/Router'
import store from '../utils/Store'

class UserController {
	private readonly api: UserApi

	constructor() {
		this.api = API
	}

	async changePassword(data: TChangePasswordData) {
		try {
			await this.api.changePassword(data)
			router.go(EAppRoutes.Profile)
		} catch (error: any) {
			console.error('changePassword error', error)
		}
	}

	async changeAvatar(data: FormData) {
		const user = await this.api.editAvatar(data)
		store.set('user', user)
	}

	async changeProfile(data: TChangeProfileData) {
		try {
			const user = await this.api.changeProfile(data)
			if (user) {
				store.set('user', user)
				router.go(EAppRoutes.Profile)
			}
		} catch (error) {
			console.error('changeProfile error', error)
		}
	}
}

export default new UserController()
