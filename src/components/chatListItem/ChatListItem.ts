import Block from '../../utils/Block'
import template from './chatListItem.hbs'
import './index.scss'

export class ChatListItem extends Block {
	constructor(props: any) {
		super({
			...props
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
