import {TChatInfo} from '../../../api/types'
import {EAppRoutes} from '../../../constants'
import ChatController from '../../../controllers/chat.controller'
import Block from '../../../utils/Block'
import {withStore} from '../../../utils/Store'
import {Link} from '../../link'
import {Chat} from '../chat'
import template from './index.hbs'

type TChatListProps = {
	chats: TChatInfo[]
	isLoaded: boolean
}

class ChatListBase extends Block<TChatListProps> {
	constructor(props: TChatListProps) {
		super({...props})
	}

	protected init() {
		this.children.chats = this.createChats(this.props)
		this.children.profileLink = new Link({
			to: EAppRoutes.Profile,
			label: 'Профиль'
		})
	}

	protected componentDidUpdate(oldProps: TChatListProps, newProps: TChatListProps) {
		this.children.chats = this.createChats(newProps)
		return true
	}

	private createChats(props: TChatListProps) {
		return props.chats.map(
			(data) =>
				new Chat({
					...data,
					events: {
						click: () => {
							ChatController.selectChat(data.id, data.title)
						}
					}
				})
		)
	}

	protected render() {
		return this.compile(template, this.props)
	}
}

const connect = withStore((state) => ({chats: [...(state.chats || [])]}))
export const ChatList = connect(ChatListBase)
