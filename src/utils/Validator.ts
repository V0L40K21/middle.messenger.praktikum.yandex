type TValidType = 'login' | 'password' | 'email' | 'name' | 'phone' | 'message'

export class Validator {
	static validate(type: TValidType, value: string): boolean {
		switch (type) {
			case 'email':
				return /^[A-Za-z0-9_.+-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-.]+$/.test(value)
			case 'name':
				return /^[A-Za-zА-Яа-яЁё-]+$/.test(value)
			case 'login':
				return /^[A-Za-z0-9_-]{3,20}$/.test(value)
			case 'password':
				return /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value)
			case 'phone':
				return /^\+?\d{10,15}$/.test(value)
			case 'message':
				return value.trim() !== ''

			default:
				return false
		}
	}
}
