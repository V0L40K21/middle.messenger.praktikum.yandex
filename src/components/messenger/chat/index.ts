import {TChatInfo} from '../../../api/types'
import Block from '../../../utils/Block'
import {withStore} from '../../../utils/Store'
import template from './index.hbs'
import './index.scss'

type TChatProps = {
	id: number
	title: string
	unreadCount: number
	selectedChat: TChatInfo | null
	events: {
		click: () => void
	}
}

class ChatBase extends Block<TChatProps> {
	constructor(props: TChatProps) {
		super({...props})
	}

	protected render(): DocumentFragment {
		return this.compile(template, {
			...this.props,
			isSelected: this.props.id === this.props.selectedChat?.id
		})
	}
}

export const withSelectedChat = withStore((state) => ({
	selectedChat: state.chats.find(({id}) => id === state.selectedChat)
}))

export const Chat = withSelectedChat(ChatBase as typeof Block)
