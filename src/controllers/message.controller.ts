import {TSocketMessage} from '../api/types'
import {ESocketEvents, socketUrl} from '../constants'
import Socket from '../utils/Socket'
import store from '../utils/Store'

class MessageController {
	private sockets: Map<number, Socket> = new Map()

	async connect(id: number, token: string) {
		try {
			if (this.sockets.has(id)) {
				return
			}
			const userId = store.getState().user?.id
			const socket = new Socket(`${socketUrl}/${userId}/${id}/${token}`)
			this.sockets.set(id, socket)
			await socket.connect()
			this.subscribe(socket, id)
			this.fetchOldMessages(id)
		} catch (error) {
			console.error('MessageController.connect error :', error)
		}
	}

	sendMessage(id: number, content: string) {
		try {
			if (!content) {
				throw new Error('Введите сообщение')
			}
			const socket = this.sockets.get(id)
			if (!socket) {
				throw new Error(`Chat ${id} is not connected`)
			}
			socket.send({type: 'message', content})
		} catch (error) {
			console.error('MessageController.sendMessage error :', error)
		}
	}

	fetchOldMessages(id: number) {
		try {
			const socket = this.sockets.get(id)
			if (!socket) {
				throw new Error(`Chat ${id} is not connected`)
			}
			socket.send({type: 'get old', content: '0'})
		} catch (error) {
			console.error('MessageController.fetchOldMessages error :', error)
		}
	}

	closeAll() {
		try {
			Array.from(this.sockets.values()).forEach((socket) => {
				socket.close()
			})
		} catch (error) {
			console.error('MessageController.closeAll error :', error)
		}
	}

	private onClose(id: number) {
		try {
			this.sockets.delete(id)
		} catch (error) {
			console.error('MessageController.onClose error :', error)
		}
	}

	private onMessage(id: number, messages: TSocketMessage | TSocketMessage[]) {
		try {
			let messagesToAdd: TSocketMessage[] = []
			if (Array.isArray(messages)) {
				messagesToAdd = messages.reverse()
			} else {
				messagesToAdd.push(messages)
			}
			const currentMessages = (store.getState().messages ?? {})[id] ?? []
			messagesToAdd = [...currentMessages, ...messagesToAdd]
			store.set(`messages.${id}`, messagesToAdd)
		} catch (error) {
			console.error('MessageController.onMessage error :', error)
		}
	}

	private subscribe(transport: Socket, id: number) {
		try {
			transport.on(ESocketEvents.Message, (message: any) => {
				this.onMessage(id, message)
			})
			transport.on(ESocketEvents.Close, () => {
				this.onClose(id)
			})
		} catch (error) {
			console.error('MessageController.subscribe error :', error)
		}
	}
}

const controller = new MessageController()
export default controller
