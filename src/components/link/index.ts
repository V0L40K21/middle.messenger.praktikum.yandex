import {PropsWithRouter, withRouter} from '../../hocs/withRouter'
import Block from '../../utils/Block'
import template from './Link.hbs'

interface ILinkProps extends PropsWithRouter {
	to: string
	label: string
	class?: string
	events?: {
		click: () => void
	}
}

class BaseLink extends Block<ILinkProps> {
	constructor(props: ILinkProps) {
		super({
			...props,
			events: {
				click: () => this.navigate()
			}
		})
	}

	navigate() {
		this.props.router.go(this.props.to)
	}

	render() {
		return this.compile(template, this.props)
	}
}

export const Link: any = withRouter(BaseLink)
