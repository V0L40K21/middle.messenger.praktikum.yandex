export enum EAppRoutes {
	Auth = '/',
	Register = '/registration',
	Messenger = '/messenger',
	Profile = '/profile',
	ChangePassword = '/profile/change-password',
	ChangeProfile = '/profile/change-profile'
}

export enum ESocketEvents {
	Connected = 'connected',
	Error = 'error',
	Message = 'message',
	Close = 'close'
}

export const resourcesUrl: string = 'https://ya-praktikum.tech/api/v2/resources'
export const socketUrl: string = 'wss://ya-praktikum.tech/ws/chats'
