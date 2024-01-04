import {TChangePasswordData} from '../api/types'
import API, {UserApi} from '../api/user.api'
import {EAppRoutes} from '../constants'
import store from '../utils/Store'
import router from '../utils/router/Router'

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
}

export default new UserController()
