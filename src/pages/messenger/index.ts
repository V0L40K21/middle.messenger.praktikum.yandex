import {ChatsList} from '../../components/messenger/chatList'
import {Messenger} from '../../components/messenger/messenger'
import ChatController from '../../controllers/chat.controller'
import Block from '../../utils/Block'
import template from './index.hbs'
import './index.scss'

export class MessengerPage extends Block {
	constructor() {
		super({})
	}

	protected init() {
		this.children.chatsList = new ChatsList({
			isLoaded: false
		})
		this.children.messenger = new Messenger({})
		ChatController.fetchChats().finally(() => {
			;(this.children.chatsList as Block).setProps({isLoaded: true})
		})
	}

	protected render() {
		return this.compile(template, this.props)
	}
}
