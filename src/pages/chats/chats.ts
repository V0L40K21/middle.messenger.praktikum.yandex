import Block from '../../utils/Block'
import {render} from '../../utils/render'
import './chats.scss'
import template from './index.hbs'

export class Chats extends Block {
	constructor() {
		super({
			onClick: () => render('auth')
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
