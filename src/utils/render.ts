import {Auth} from '../pages/auth/auth'

const ROUTES = {
	auth: Auth
	// 'login': LoginPage,
}

export function render(name: keyof typeof ROUTES) {
	const root = document.querySelector('#app')

	if (root) {
		root.innerHTML = ''

		const Page = ROUTES[name]
		const page = new Page()

		root.append(page.getContent() ?? '')
		page.dispatchComponentDidMount()
	}
}
