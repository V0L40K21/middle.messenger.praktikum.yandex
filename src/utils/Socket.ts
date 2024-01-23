import {ESocketEvents} from '../constants'
import {EventBus} from './EventBus'

export default class Socket extends EventBus {
	private socket: WebSocket | null = null

	private pingInterval: NodeJS.Timeout | number = 0

	constructor(private url: string) {
		super()
	}

	public async connect() {
		this.socket = new WebSocket(this.url)
		this.subscribe(this.socket)
		this.setupPing()
		return new Promise<void>((resolve) => {
			this.on(ESocketEvents.Connected, () => {
				resolve()
			})
		})
	}

	public send(data: unknown) {
		if (!this.socket) {
			throw new Error('Socket is not connected')
		}
		this.socket.send(JSON.stringify(data))
	}

	public close() {
		this.socket?.close()
	}

	private setupPing() {
		this.pingInterval = setInterval(() => {
			this.send({type: 'ping'})
		}, 5000)
		this.on(ESocketEvents.Close, () => {
			clearInterval(this.pingInterval)
			this.pingInterval = 0
		})
	}

	private subscribe(socket: WebSocket) {
		socket.addEventListener('open', () => {
			this.emit(ESocketEvents.Connected)
		})
		socket.addEventListener('close', () => {
			this.emit(ESocketEvents.Close)
		})
		socket.addEventListener('error', (e) => {
			this.emit(ESocketEvents.Error, e)
		})
		socket.addEventListener('message', (message) => {
			try {
				const data = JSON.parse(message.data)
				if (data.type === 'pong') {
					return
				}
				this.emit(ESocketEvents.Message, data)
			} catch (error) {
				console.log('socket.addEventListener error :', error)
			}
		})
	}
}
