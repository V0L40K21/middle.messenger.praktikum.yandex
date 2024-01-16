import {TSocketMessage} from '../api/types'
import {ESocketEvents, socketUrl} from '../constants'
import Socket from '../utils/Socket'
import store from '../utils/Store'

class MessageController {
	private sockets: Map<number, Socket> = new Map()

	async connect(id: number, token: string) {
		if (this.sockets.has(id)) {
			return
		}
		const userId = store.getState().user?.id
		const socket = new Socket(`${socketUrl}/${userId}/${id}/${token}`)
		this.sockets.set(id, socket)
		await socket.connect()
		this.subscribe(socket, id)
		this.fetchOldMessages(id)
	}

	sendMessage(id: number, content: string) {
		const socket = this.sockets.get(id)
		if (!socket) {
			throw new Error(`Chat ${id} is not connected`)
		}
		socket.send({type: 'message', content})
	}

	fetchOldMessages(id: number) {
		const socket = this.sockets.get(id)
		if (!socket) {
			throw new Error(`Chat ${id} is not connected`)
		}
		socket.send({type: 'get old', content: '0'})
	}

	closeAll() {
		Array.from(this.sockets.values()).forEach((socket) => {
			socket.close()
		})
	}

	private onClose(id: number) {
		this.sockets.delete(id)
	}

	private onMessage(id: number, messages: TSocketMessage | TSocketMessage[]) {
		let messagesToAdd: TSocketMessage[] = []
		if (Array.isArray(messages)) {
			messagesToAdd = messages.reverse()
		} else {
			messagesToAdd.push(messages)
		}
		const currentMessages = (store.getState().messages ?? {})[id] ?? []
		messagesToAdd = [...currentMessages, ...messagesToAdd]
		store.set(`messages.${id}`, messagesToAdd)
	}

	private subscribe(transport: Socket, id: number) {
		transport.on(ESocketEvents.Message, (message: any) => {
			this.onMessage(id, message)
		})
		transport.on(ESocketEvents.Close, () => {
			this.onClose(id)
		})
	}
}

const controller = new MessageController()
export default controller
