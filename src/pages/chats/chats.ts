import {EAppRoutes} from '../../constants'
import router from '../../utils/router/Router'
import Block from '../../utils/Block'
import './chats.scss'
import template from './index.hbs'

export class ChatsPage extends Block {
	constructor() {
		super({
			onClick: () => router.go(EAppRoutes.Profile),
			dialogs: [
				{
					name: 'Hukumka',
					message: 'Hello',
					time: '18:20',
					count: 1
				},
				{
					name: 'Andrey',
					message: 'Hello world',
					time: '18:22'
				}
			]
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
