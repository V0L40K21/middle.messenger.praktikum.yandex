import {Auth} from '../pages/auth/auth'
import {Chats} from '../pages/chats/chats'
import {E404} from '../pages/errors/404'
import {E500} from '../pages/errors/500'
import {Profile} from '../pages/profile/profile'
import {Registration} from '../pages/registration/registration'

const ROUTES = {
	auth: Auth,
	registration: Registration,
	chats: Chats,
	e404: E404,
	e500: E500,
	profile: Profile
}

export function render(name: keyof typeof ROUTES) {
	const root = document.querySelector('#app')!

	root.innerHTML = ''

	const Page = ROUTES[name]
	const page = new Page()

	root.append(page.getContent()!)
	page.dispatchComponentDidMount()
}
