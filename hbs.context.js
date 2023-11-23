export const context = {
	auth: {
		inputs: [
			{
				name: 'login',
				placeholder: 'Логин',
				type: 'text'
			},
			{
				name: 'password',
				placeholder: 'Пароль',
				type: 'password'
			}
		]
	},
	registration: {
		inputs: [
			{
				name: 'first_name',
				placeholder: 'Имя',
				type: 'text'
			},
			{
				name: 'second_name',
				placeholder: 'Фамилия',
				type: 'text'
			},
			{
				name: 'login',
				placeholder: 'Логин',
				type: 'text'
			},
			{
				name: 'email',
				placeholder: 'E-mail',
				type: 'email'
			},
			{
				name: 'phone',
				placeholder: 'Телефон',
				type: 'tel'
			},
			{
				name: 'password',
				placeholder: 'Пароль',
				type: 'password'
			},
			{
				name: 'passwordRepeat',
				placeholder: 'Пароль ещё раз',
				type: 'password'
			}
		]
	},
	profile: {
		data: {
			Почта: 'abc@xyz.com',
			Логин: 'abc',
			Имя: 'a',
			Фамилия: 'b',
			'Имя в чате': 'abc',
			Телефон: '+7 (123) 123 12 12'
		}
	}
}
