import {render} from '../../utils/render'
import Block from '../../utils/Block'
import './errors.scss'
import template from './404.hbs'

export class E404 extends Block {
	constructor() {
		super({
			onClick: () => render('chats')
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
