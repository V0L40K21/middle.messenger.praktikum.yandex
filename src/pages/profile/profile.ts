import Block from '../../utils/Block'
import {render} from '../../utils/render'
import template from './index.hbs'
import './profile.scss'

export class Profile extends Block {
	constructor() {
		super({
			backClick: () => render('chats'),
			logOutClick: () => render('auth'),
			data: {
				Почта: 'abc@xyz.com',
				Логин: 'abc',
				Имя: 'a',
				Фамилия: 'b',
				'Имя в чате': 'abc',
				Телефон: '+7 (123) 123 12 12'
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
