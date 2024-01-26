import sinon from 'sinon'
import Router, {BlockConstructable} from './Router.ts'
import {expect} from 'chai'

describe('Router', () => {
	global.window.history.back = () => {
		if (typeof window.onpopstate === 'function') {
			window.onpopstate({currentTarget: window} as unknown as PopStateEvent)
		}
	}
	global.window.history.forward = () => {
		if (typeof window.onpopstate === 'function') {
			window.onpopstate({currentTarget: window} as unknown as PopStateEvent)
		}
	}
	const getContentFake = sinon.fake.returns(document.createElement('div'))
	const block = class {
		getContent = getContentFake
	} as unknown as BlockConstructable

	it('should render start page', () => {
		Router.use('/', block).start()
		expect(getContentFake.callCount).equal(1)
	})
	it('should return Router', () => {
		const res = Router.use('/', block)
		expect(res).equal(Router)
	})
	it('should render history page', () => {
		Router.use('/', block).start()
		Router.back()
		expect(getContentFake.callCount).equal(1)
	})
})
