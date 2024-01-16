import userController from '../../controllers/user.controller'
import Block from '../../utils/Block'
import {Button} from '../button'
import template from './index.hbs'

type TProfileAvatarProps = {
	src: string
}

export class ProfileAvatar extends Block<TProfileAvatarProps> {
	constructor(props: TProfileAvatarProps) {
		super({...props})
	}

	protected init(): void {
		this.children.changeButton = new Button({
			label: 'Изменить',
			class: 'profile__buttons_pass',
			events: {
				click: async () => {
					const {files} = document.querySelector(
						'.profile__avatarWrapper_input-file'
					) as HTMLInputElement
					if (files) {
						const data = new FormData()
						data.append('avatar', files[0])
						await userController.changeAvatar(data)
					}
				}
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
