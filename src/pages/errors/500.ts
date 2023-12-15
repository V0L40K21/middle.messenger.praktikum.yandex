import {render} from '../../utils/render'
import Block from '../../utils/Block'
import './errors.scss'
import template from './500.hbs'

export class E500 extends Block {
	constructor() {
		super({
			onClick: () => render('chats')
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
