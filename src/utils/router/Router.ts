import {Auth} from '../../pages/auth/auth'
import {Chats} from '../../pages/chats/chats'
import {Registration} from '../../pages/registration/registration'
import Route from './Route'

class Router {
	static __instance: any

	routes: Route[]

	history: History

	private _currentRoute?: Route

	constructor() {
		this.routes = []
		this.history = window.history
	}

	use(pathname: string, block: any) {
		const route = new Route(pathname, block)

		this.routes.push(route)

		return this
	}

	start() {
		window.onpopstate = (event: Event) => {
			const win = event.currentTarget as Window
			this._onRoute(win.location.pathname)
		}
		this._onRoute(window.location.pathname)
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname)
		if (!route) {
			return
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave()
		}

		this._currentRoute = route
		route.render()
	}

	go(pathname: string) {
		this.history.pushState({}, '', pathname)
		this._onRoute(pathname)
	}

	back() {
		this.history.back()
	}

	forward() {
		this.history.forward()
	}

	getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname))
	}
}
export default new Router()
	.use('/', Auth)
	.use('/registration', Registration)
	.use('/chats', Chats)
