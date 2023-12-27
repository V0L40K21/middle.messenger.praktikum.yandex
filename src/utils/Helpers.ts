export default class Helpers {
	static queryStringify(data: Record<string, string>) {
		return Object.entries(data ?? {})
			.map(([key, value]) => `${key}=${value}`)
			.join('&')
	}

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

	static merge(a: Object, b: Object): Object {
		return Object.assign(a, b)
	}

	static set(target: Object, path: string, value: any): Object {
		if (target.constructor !== Object) {
			return target
		}
		if (typeof path !== 'string') {
			throw new Error('path must be a string')
		}
		const keys = path.split('.')
		const objFromKeys = keys.reduceRight(
			(acc, key, i, arr) => ({
				[key]: i === arr.length - 1 ? value : acc
			}),
			{}
		)
		return this.merge(target, objFromKeys)
	}
}
