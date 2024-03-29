import {HTTPTransport} from '../utils/Request'
import {TChangePasswordData, TChangeProfileData, TUser} from './types'

export class UserApi {
	protected axios: HTTPTransport

	constructor() {
		this.axios = new HTTPTransport('/user')
	}

	changePassword(data: TChangePasswordData) {
		return this.axios.put('/password', data)
	}

	editAvatar(data: FormData) {
		return this.axios.put<TUser>('/profile/avatar', data)
	}

	changeProfile(data: TChangeProfileData) {
		return this.axios.put<TUser>('/profile', data)
	}
}

export default new UserApi()
