export type TSignUpData = {
	first_name: string
	second_name: string
	login: string
	email: string
	password: string
	phone: string
}

export type TSignUpResponse = {
	id: number
}

export type TSignInData = {
	login: string
	password: string
}

export type TUser = {}
