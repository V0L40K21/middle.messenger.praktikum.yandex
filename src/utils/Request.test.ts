import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from 'sinon'
import {expect} from 'chai'
import {HTTPTransport} from './Request.ts'

describe('HTTPTransport', () => {
	let xhr: SinonFakeXMLHttpRequestStatic
	let instance: HTTPTransport
	let requests: SinonFakeXMLHttpRequest[] = []

	beforeEach(() => {
		xhr = sinon.useFakeXMLHttpRequest()
		// @ts-ignore
		global.XMLHttpRequest = xhr
		xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
			requests.push(request)
		}
		instance = new HTTPTransport('')
	})

	afterEach(() => {
		requests = []
	})

	describe('Method GET', () => {
		it('should send GET request', () => {
			instance.get('/stickers')
			const [request] = requests
			expect(request.method).to.eq('GET')
		})
		it('should send correct url', () => {
			instance.get('/stickers')
			const [request] = requests
			expect(request.url).to.eq('https://ya-praktikum.tech/api/v2/stickers')
		})
	})

	describe('Method POST', () => {
		it('should send POST request', () => {
			instance.post('/resources')
			const [request] = requests
			expect(request.method).to.eq('POST')
		})
		it('should send correct url', () => {
			instance.post('/resources')
			const [request] = requests
			expect(request.url).to.eq('https://ya-praktikum.tech/api/v2/resources')
		})
	})

	describe('Method PUT', () => {
		it('should send PUT request', () => {
			instance.put('/user/profile', {})
			const [request] = requests
			expect(request.method).to.eq('PUT')
		})
		it('should send correct url', () => {
			instance.put('/user/profile', {})
			const [request] = requests
			expect(request.url).to.eq('https://ya-praktikum.tech/api/v2/user/profile')
		})
	})

	describe('Method DELETE', () => {
		it('should send DELETE request', () => {
			instance.delete('/chats')
			const [request] = requests
			expect(request.method).to.eq('DELETE')
		})
		it('should send correct url', () => {
			instance.delete('/chats')
			const [request] = requests
			expect(request.url).to.eq('https://ya-praktikum.tech/api/v2/chats')
		})
	})
})
