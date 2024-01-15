import ChatController from '../../controllers/chat.controller'
import Block from '../../utils/Block'
import {ChatsList} from '../chats/chats'
import template from './index.hbs'

export class MessengerPage extends Block {
	constructor() {
		super({})
	}

	protected init() {
		this.children.chatsList = new ChatsList({
			isLoaded: false
		})
		ChatController.fetchChats().finally(() => {
			;(this.children.chatsList as Block).setProps({isLoaded: true})
		})
	}

	protected render() {
		return this.compile(template, {})
	}
}
