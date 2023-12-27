import {HTTPTransport} from '../utils/Request'
import {TSignInData, TSignUpData, TSignUpResponse} from './types'

export class AuthApi {
	protected axios: HTTPTransport

	constructor() {
		this.axios = new HTTPTransport('/auth')
	}

	signIn(data: TSignInData) {
		return this.axios.post('/signin', data)
	}

	signUp(data: TSignUpData) {
		return this.axios.post<TSignUpResponse>('/signup', data)
	}

	getProfile() {
		return this.axios.get('/user')
	}

	logOut() {
		return this.axios.post('/logout')
	}
}

export default new AuthApi()
