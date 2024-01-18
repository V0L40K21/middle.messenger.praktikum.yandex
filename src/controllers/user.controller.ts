import {TChangePasswordData, TChangeProfileData} from '../api/types'
import API, {UserApi} from '../api/user.api'
import {EAppRoutes} from '../constants'
import router from '../utils/Router'
import authController from './auth.controller'

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
			console.error('UserController.changePassword error', error)
		}
	}

	async changeAvatar(data: FormData) {
		try {
			await this.api.editAvatar(data)
			await authController.fetchProfile()
		} catch (error) {
			console.error('UserController.changeAvatar error', error)
		}
	}

	async changeProfile(data: TChangeProfileData) {
		try {
			await this.api.changeProfile(data)
			await authController.fetchProfile()
			router.go(EAppRoutes.Profile)
		} catch (error) {
			console.error('UserController.changeProfile error', error)
		}
	}
}

export default new UserController()
