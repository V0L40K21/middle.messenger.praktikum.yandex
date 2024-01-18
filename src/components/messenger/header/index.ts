import {TChatInfo, TUser} from '../../../api/types'
import chatController from '../../../controllers/chat.controller'
import Block from '../../../utils/Block'
import {Button} from '../../button'
import {Input} from '../../input'
import {withSelectedChat} from '../chat'
import template from './index.hbs'
import './index.scss'

type THeaderProps = {
	users: (TUser & {role: string})[]
	selectedChat: TChatInfo
}

class HeaderBase extends Block<THeaderProps> {
	constructor(props: THeaderProps) {
		super({...props})
	}

	protected init(): void {
		this.children.settings = new Button({
			label: '...',
			events: {
				click: () => this.toggleSettings()
			},
			class: 'header__btn'
		})
		this.children.removeChat = new Button({
			label: 'Удалить чат',
			events: {
				click: async () => {
					await chatController.deleteChat(this.props.selectedChat.id)
				}
			}
		})
		this.children.userIdInput = new Input({
			name: 'userId',
			placeholder: 'User ID',
			type: 'text'
		})
		this.children.addUserBtn = new Button({
			label: '+ user',
			events: {
				click: () => this.addUser()
			}
		})
		this.children.removeUserBtn = new Button({
			label: '- user',
			events: {
				click: () => this.removeUser()
			}
		})
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props)
	}

	private toggleSettings() {
		const element = this.element?.querySelector('#settingsModal') as HTMLDivElement
		if (element.style.display === 'none') {
			element.style.display = 'flex'
		} else {
			element.style.display = 'none'
		}
	}

	private async addUser() {
		const input = this.element?.getElementsByTagName('input')[0]
		const userId = input?.value ? Number(input.value) : undefined
		if (!userId) return
		await chatController.addUserToChat(this.props.selectedChat.id, userId)
	}

	private async removeUser() {
		const input = this.element?.getElementsByTagName('input')[0]
		const userId = input?.value ? Number(input.value) : undefined
		if (!userId) return
		await chatController.deleteUser(this.props.selectedChat.id, userId)
	}
}

export const Header = withSelectedChat(HeaderBase as typeof Block)
