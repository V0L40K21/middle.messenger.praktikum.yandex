import Helpers from './Helpers'
import store from './Store'

enum EMETHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE'
}

type TOptions = {
	method?: EMETHODS
	data?: any
	timeout?: number
	headers?: Record<string, string>
}

export class HTTPTransport {
	static baseURL = 'https://ya-praktikum.tech/api/v2'

	protected endpoint: string

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.baseURL}${endpoint}`
	}

	get<T>(path: string, options: TOptions = {}) {
		const {data} = options
		const queryString = Helpers.queryStringify(data ?? {})
		const fullUrl = queryString
			? `${this.endpoint}${path}?${queryString}`
			: this.endpoint + path

		return this.request<T>(fullUrl)
	}

	put<T>(path: string, data: unknown = {}) {
		return this.request<T>(this.endpoint + path, {data, method: EMETHODS.PUT})
	}

	post<T>(path: string, data: unknown = {}) {
		return this.request<T>(this.endpoint + path, {data, method: EMETHODS.POST})
	}

	delete<T>(path: string, data: unknown = {}) {
		return this.request<T>(this.endpoint + path, {data, method: EMETHODS.DELETE})
	}

	async request<T>(
		path: string,
		options: TOptions = {method: EMETHODS.GET},
		timeout: number = 5000
	): Promise<T> {
		const {method, data, headers = {}} = options
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			if (method) {
				xhr.open(method, path)
			}

			if (headers) {
				Object.entries(headers).forEach(([name, value]) => {
					xhr.setRequestHeader(name, value)
				})
			}

			xhr.onerror = () => reject(new Error('Network error'))
			xhr.ontimeout = () => reject(new Error('Timeout error'))
			xhr.onabort = () => reject(new Error('Request aborted'))
			xhr.withCredentials = true
			xhr.responseType = 'json'

			xhr.timeout = timeout

			if (method === EMETHODS.GET) {
				xhr.send()
			} else if (data instanceof FormData) {
				xhr.send(data)
			} else {
				const requestData = typeof data === 'object' ? JSON.stringify(data) : data
				xhr.setRequestHeader('Content-Type', 'application/json')
				xhr.send(requestData)
			}

			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(xhr.response)
				} else {
					store.set('error', xhr.response.reason ?? xhr.statusText)
					reject(
						new Error(`${xhr.status}-я ошибка: ${xhr.response.reason ?? xhr.statusText}`)
					)
				}
			}
		})
	}
}
