export class EventBus {
	private readonly listeners: Record<string, Array<(...args: any[]) => void>> = {}

	on(event: string, callback: () => void) {
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}
		this.listeners[event].push(callback)
	}

	off(event: string, callback: () => void) {
		if (!this.listeners[event]) {
			return
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		)
	}

	emit(event: string, ...args: unknown[]) {
		if (!this.listeners[event]) {
			return
		}

		this.listeners[event].forEach((listener) => {
			listener(...args)
		})
	}
}
