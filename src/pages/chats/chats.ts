import Block from '../../utils/Block'
import {render} from '../../utils/render'
import './chats.scss'
import template from './index.hbs'

export class Chats extends Block {
	constructor() {
		super({
			onClick: () => render('profile'),
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
