import Block from '../../../utils/Block'
import template from './index.hbs'
import './index.scss'

type TMessageProps = {
	content: string
	isMine: boolean
}

export class Message extends Block<TMessageProps> {
	constructor(props: TMessageProps) {
		super({...props})
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props)
	}
}
