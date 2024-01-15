import {withStore} from '../../utils/Store'
import {TChatInfo} from '../../api/types'
import {EAppRoutes} from '../../constants'
import ChatController from '../../controllers/chat.controller'
import Block from '../../utils/Block'
import router from '../../utils/Router'
import './chats.scss'
import template from './index.hbs'
import {ChatListItem} from '../../components/chatListItem/ChatListItem'

type TChatListProps = {
	chats: TChatInfo[]
	isLoaded: boolean
}

export class ChatsListBase extends Block {
	constructor(props: TChatListProps) {
		super({
			...props,
			onClick: () => router.go(EAppRoutes.Profile),
			dialogs: [
				{
					name: 'Hukumka',
					message: 'Hello',
					time: '18:20',
					count: 1
				}
				// {
				// 	name: 'Andrey',
				// 	message: 'Hello world',
				// 	time: '18:22'
				// }
			]
		})
	}

	protected init() {
		this.props.dialogs = this.createChats(this.props)
		console.log('init', this.children)
	}

	protected componentDidUpdate(): boolean {
		this.props.dialogs = this.createChats(this.props)
		console.log('cdu', this.children)
		return true
	}

	private createChats(props: TChatListProps) {
		console.log('props :', props)
		return props.chats?.map(
			(data) =>
				new ChatListItem({
					...data,
					events: {
						click: () => {
							ChatController.selectChat(data.id, data.title)
						}
					}
				})
		)
	}

	render() {
		console.log('render', this.children)
		return this.compile(template, this.props)
	}
}

const connect = withStore((state) => [...state.chats] ?? [])
export const ChatsList = connect(ChatsListBase)
