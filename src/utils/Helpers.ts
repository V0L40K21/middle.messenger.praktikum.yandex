export default class Helpers {
	static isEqual(a: any, b: any): boolean {
		if (a === null || b === null) {
			return a === b
		}
		if (typeof a !== 'object' || typeof b !== 'object') {
			return a === b
		}
		const keysA = Object.keys(a)
		const keysB = Object.keys(b)
		if (keysA.length !== keysB.length) {
			return false
		}

		let isEqual = true

		keysA.forEach((key) => {
			if (!keysB.includes(key) || !this.isEqual(a[key], b[key])) {
				isEqual = false
			}
		})

		return isEqual
	}
}
