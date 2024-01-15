export type TValidType = 'login' | 'password' | 'email' | 'name' | 'phone' | 'message'

export type TValidRes = {
	isValid: boolean
	errorMessage: string
}

export class Validator {
	public static validateNode(
		input: HTMLInputElement,
		styleClass: string,
		type: TValidType
	) {
		const {value, name} = input
		const {isValid, errorMessage} = this.validate(type, value)
		const errorLabel = document.createElement('label')
		errorLabel.className = `${styleClass}__errorLabel`
		errorLabel.id = `${styleClass}__errorLabel_${name}`
		errorLabel.htmlFor = name
		errorLabel.textContent = errorMessage
		if (!isValid) {
			input.classList.add(`${styleClass}__error`)
			if (!document.getElementById(`${styleClass}__errorLabel_${name}`)) {
				input.after(errorLabel)
			}
		} else {
			input.classList.remove(`${styleClass}__error`)
			document.getElementById(`${styleClass}__errorLabel_${name}`)?.remove()
		}
	}

	static validate(type: TValidType, value: string): TValidRes {
		switch (type) {
			case 'email':
				return {
					isValid: /^[A-Za-z0-9_.+-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-.]+$/.test(value),
					errorMessage: 'Только большие и маленькие латинские буквы и цифры'
				}
			case 'name':
				return {
					isValid: /^[A-Za-zА-Яа-яЁё-]+$/.test(value),
					errorMessage: 'Только большие и маленькие латинские и русские буквы'
				}
			case 'login':
				return {
					isValid: /^[A-Za-z0-9_-]{3,20}$/.test(value),
					errorMessage: 'Длина: 3-20, Только большие и маленькие латинские буквы и цифры'
				}
			case 'password':
				return {
					isValid: /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value),
					errorMessage: 'Длина: 8-40, большая латинская буква, цифра'
				}
			case 'phone':
				return {
					isValid: /^\+?\d{10,15}$/.test(value),
					errorMessage: 'Длина: 10-15, цифры'
				}
			case 'message':
				return {
					isValid: value.trim() !== '',
					errorMessage: 'Введите сообщение'
				}

			default:
				return {
					isValid: false,
					errorMessage: 'Что-то пошло не так'
				}
		}
	}
}
