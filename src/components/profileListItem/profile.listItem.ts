import Block from '../../utils/Block'
import template from './profile.listItem.hbs'

type TProfileListItemProps = {
	key: string
	value: string
}

export class ProfileListItem extends Block<TProfileListItemProps> {
	constructor(props: TProfileListItemProps) {
		super({...props})
	}

	render() {
		return this.compile(template, this.props)
	}
}
