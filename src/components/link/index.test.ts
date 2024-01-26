import {expect} from 'chai'
import sinon from 'sinon'
import {BaseLink, Link} from './index.ts'
import Router from '../../utils/Router.ts'

describe('Link', () => {
	it('should render', () => {
		new Link({to: '/'})
	})

	it('element should return anchor tag', () => {
		const go = sinon.fake()
		const link = new BaseLink({
			to: '/',
			label: 'Home',
			router: {go} as unknown as typeof Router
		})

		const {element} = link

		expect(element).to.be.instanceof(window.HTMLSpanElement)
	})

	it('should go to passed route on click', () => {
		const go = sinon.fake()
		const to = '/path'

		const link = new BaseLink({
			to,
			label: 'Path',
			router: {go} as unknown as typeof Router
		})

		const element = link.element as HTMLSpanElement

		element.click()

		expect(go.calledOnce).to.eq(true)
	})
})
