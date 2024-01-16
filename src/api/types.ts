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

export type TUser = {
	id: number
	first_name: string
	second_name: string
	display_name: string
	login: string
	avatar: string
	email: string
	phone: string
}

export type TChangePasswordData = {
	oldPassword: string
	newPassword: string
}

export type TChangeProfileData = {
	first_name: string
	second_name: string
	display_name: string
	login: string
	email: string
	phone: string
}

export type TSocketMessage = {
	chat_id: number
	time: string
	type: string
	user_id: number
	content: string
	file?: {
		id: number
		user_id: number
		path: string
		filename: string
		content_type: string
		content_size: number
		upload_date: string
	}
}

export type TChatInfo = {
	id: number
	title: string
	avatar?: string
	unread_count: number
	last_message?: {
		user: TUser
		time: string
		content: string
	}
}

export type TDeleteChatRes = {
	userId: number
	result: {
		id: number
		title: string
		avatar: string
		created_by: number
	}
}

export type TGetTokenRes = {
	token: string
}
