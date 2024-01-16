import {TSocketMessage} from '../../../api/types'
import messageController from '../../../controllers/message.controller'
import Block from '../../../utils/Block'
import {withStore} from '../../../utils/Store'
import {Validator} from '../../../utils/Validator'
import {Button} from '../../button'
import {Input} from '../../input'
import {Message} from '../message'
import template from './index.hbs'
import './index.scss'

type TMessengerProps = {
	selectedChat?: number
	messages: TSocketMessage[]
	userId: number
}

class MessengerBase extends Block<TMessengerProps> {
	constructor(props: TMessengerProps) {
		super({...props})
	}

	protected init() {
		this.children.messages = this.createMessages(this.props)
		this.children.input = new Input({
			type: 'text',
			placeholder: 'Сообщение',
			class: 'messenger__footer_input',
			name: 'message',
			events: {
				blur(event) {
					const target = event.target as HTMLInputElement
					Validator.validateNode(target, 'auth__form_input', 'message')
				}
			}
		})
		this.children.button = new Button({
			label: 'Отправить',
			events: {
				click: () => {
					const input = this.children.input as Input
					const message = input.getValue()
					input.setValue('')
					messageController.sendMessage(this.props.selectedChat!, message)
				}
			}
		})
	}

	protected componentDidUpdate(
		oldProps: TMessengerProps,
		newProps: TMessengerProps
	): boolean {
		console.log('oldProps :', oldProps)
		this.children.messages = this.createMessages(newProps)
		return true
	}

	private createMessages(props: TMessengerProps) {
		return props.messages.map(
			(message) => new Message({...message, isMine: props.userId === message.user_id})
		)
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props)
	}
}

const withSelectedChatMessages = withStore((state) => {
	const selectedChatId = state.selectedChat
	if (!selectedChatId) {
		return {
			messages: [],
			selectedChat: undefined,
			userId: state.user?.id
		}
	}
	return {
		messages: (state.messages || {})[selectedChatId] || [],
		selectedChat: state.selectedChat,
		userId: state.user?.id
	}
})

export const Messenger = withSelectedChatMessages(MessengerBase as typeof Block)
