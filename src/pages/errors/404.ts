import {EAppRoutes} from '../../constants'
import Block from '../../utils/Block'
import Router from '../../utils/Router'
import template from './404.hbs'
import './errors.scss'

export class E404 extends Block {
	constructor() {
		super({
			onClick: () => Router.go(EAppRoutes.Messenger)
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}
