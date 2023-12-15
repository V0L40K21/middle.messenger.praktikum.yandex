import Block from '../../utils/Block'
import template from './chatsHeader.hbs'
import './index.scss'

export class ChatsHeader extends Block {
	constructor() {
		super({})
	}

	render() {
		return this.compile(template, this.props)
	}
}
