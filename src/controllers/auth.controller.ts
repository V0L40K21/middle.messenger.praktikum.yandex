import {HTTPTransport} from '../utils/Request'
import router from '../utils/router/Router'
import {TSignInData, TSignUpData} from './types'

const axios = new HTTPTransport()

export default class AuthController {
	static baseURL = 'https://ya-praktikum.tech/api/v2'

	public static async signUp(data: TSignUpData) {
		return axios.post(`${this.baseURL}/auth/signup`, {data}).then((res) => {
			if (res.status === 200) {
				router.go('/chats')
			}
		})
	}

	public static async signIn(data: TSignInData) {
		return axios.post(`${this.baseURL}/auth/signin`, {data}).then((res) => {
			if (res.status === 200) {
				router.go('/chats')
			}
		})
	}
}
