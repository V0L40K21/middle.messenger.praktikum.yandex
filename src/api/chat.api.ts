import {HTTPTransport} from '../utils/Request'
import {TChatInfo, TDeleteChatRes, TGetTokenRes, TUser} from './types'

export class ChatApi {
	protected axios: HTTPTransport

	constructor() {
		this.axios = new HTTPTransport('/chats')
	}

	async getToken(id: number) {
		const res = await this.axios.post<TGetTokenRes>(`/token/${id}`)
		return res.token
	}

	create(title: string) {
		return this.axios.post('/', {title})
	}

	read() {
		return this.axios.get<TChatInfo[]>('/')
	}

	getUsers(id: number) {
		return this.axios.get<(TUser & {role: string})[]>(`/${id}/users`)
	}

	addUsers(chatId: number, users: number[]) {
		return this.axios.put('/users', {users, chatId})
	}

	delete(chatId: number) {
		return this.axios.delete<TDeleteChatRes>('/', {chatId})
	}

	deleteUser(chatId: number, users: number[]) {
		return this.axios.delete('/users', {users, chatId})
	}
}

export default new ChatApi()
