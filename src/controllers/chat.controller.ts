import store from '../utils/Store'
import API, {ChatApi} from '../api/chat.api'
import MessageController from './message.controller'

class ChatController {
	private readonly api: ChatApi

	constructor() {
		this.api = API
	}

	async create(title: string) {
		try {
			await this.api.create(title)
			this.fetchChats()
		} catch (error) {
			console.error('ChatController.create error', error)
		}
	}

	async fetchChats() {
		try {
			const chats = await this.api.read()
			if (chats.length) {
				chats.map(async (chat) => {
					const token = await this.api.getToken(chat.id)
					await MessageController.connect(chat.id, token)
				})
				store.set('chats', chats)
			}
		} catch (error) {
			console.error('ChatController.fetchChats error :', error)
		}
	}

	async fetchChatUsers(id: number) {
		try {
			const users = await this.api.getUsers(id)
			if (users.length) {
				store.set('chatUsers', users)
			}
		} catch (error) {
			console.error('ChatController.fetchChatUsers error :', error)
		}
	}

	async addUserToChat(id: number, userId: number) {
		try {
			await this.api.addUsers(id, [userId])
			this.fetchChatUsers(id)
		} catch (error) {
			console.error('ChatController.addUserToChat error', error)
		}
	}

	async deleteChat(id: number) {
		try {
			await this.api.delete(id)
			store.set('selectedChat', undefined)
			this.fetchChats()
		} catch (error) {
			console.error('ChatController.deleteChat error', error)
		}
	}

	async deleteUser(id: number, userId: number) {
		try {
			await this.api.deleteUser(id, [userId])
			this.fetchChatUsers(id)
		} catch (error) {
			console.error('ChatController.deleteUser error', error)
		}
	}

	async uploadAvatar(id: number, avatar: FormData) {
		try {
			await this.api.uploadAvatar(id, avatar)
		} catch (error) {
			console.error('ChatController.uploadAvatar error', error)
		}
	}

	async getUsers(id: number) {
		try {
			await this.api.getUsers(id)
			this.fetchChatUsers(id)
		} catch (error) {
			console.error('ChatController.getUsers error', error)
		}
	}

	getToken(id: number) {
		return this.api.getToken(id)
	}

	selectChat(id: number, name: string) {
		store.set('selectedChat', id)
		store.set('messageUser', name)
	}
}

const controller = new ChatController()

export default controller
