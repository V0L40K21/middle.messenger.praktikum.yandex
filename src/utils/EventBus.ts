export class EventBus {
	private readonly listeners: Record<string, Array<() => void>> = {}

	on(event: string, callback: () => void) {
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}
		this.listeners[event].push(callback)
	}

	off(event: string, callback: () => void) {
		if (!this.listeners[event]) {
			throw new Error(`События "${event}" не существует`)
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		)
	}

	emit(event: string, ...args: any[]) {
		if (!this.listeners[event]) {
			throw new Error(`События "${event}" не существует`)
		}

		this.listeners[event].forEach(listener => {
			//@ts-ignore
			listener(...args)
		})
	}
}
