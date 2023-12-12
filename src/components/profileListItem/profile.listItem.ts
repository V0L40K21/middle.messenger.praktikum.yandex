import Block from '../../utils/Block'
import template from './profile.listItem.hbs'

export class ProfileListItem extends Block {
	constructor(props: any) {
		super({
			...props,
			events: {
				click: props.onClick
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
