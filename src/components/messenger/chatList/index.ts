import {TChatInfo} from '../../../api/types'
import {EAppRoutes} from '../../../constants'
import ChatController from '../../../controllers/chat.controller'
import MessageController from '../../../controllers/message.controller'
import Block from '../../../utils/Block'
import {withStore} from '../../../utils/Store'
import {Validator} from '../../../utils/Validator'
import {Button} from '../../button'
import {Input} from '../../input'
import {Link} from '../../link'
import {Chat} from '../chat'
import template from './index.hbs'
import './index.scss'

type TChatListProps = {
	chats: TChatInfo[]
	isLoaded: boolean
}

class ChatsListBase extends Block<TChatListProps> {
	constructor(props: TChatListProps) {
		super({...props})
	}

	protected init() {
		this.children.chats = this.createChats(this.props)
		this.children.profileLink = new Link({
			to: EAppRoutes.Profile,
			label: 'Профиль'
		})
		this.children.input = new Input({
			name: 'chatName',
			placeholder: 'Название чата',
			type: 'text',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'auth__form_input', 'name')
				}
			}
		})
		this.children.btnAddChat = new Button({
			label: 'Добавить',
			events: {
				click: () => this.addChat()
			}
		})
	}

	protected componentDidUpdate(_oldProps: TChatListProps, newProps: TChatListProps) {
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
							if (data) {
								ChatController.selectChat(data.id, data.title)
								ChatController.getUsers(data.id)
								MessageController.fetchOldMessages(data.id)
							}
						}
					}
				})
		)
	}

	private addChat() {
		const input = this.children.input as Input
		if (!input.getValue().trim()) return
		ChatController.create(input.getValue())
		input.setValue('')
	}

	protected render() {
		return this.compile(template, this.props)
	}
}

const withChats = withStore((state) => ({chats: state.chats}))

export const ChatsList = withChats(ChatsListBase as typeof Block)
