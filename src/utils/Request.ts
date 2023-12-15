const METHODS = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE'
}

type TOptions = {
	method: string
	data: Record<string, string>
	timeout: number
	headers: Record<string, string>
}

export class HTTPTransport {
	queryStringify(data: Record<string, string>) {
		return Object.entries(data ?? {})
			.map(([key, value]) => `${key}=${value}`)
			.join('&')
	}

	get(url: string, options: TOptions = {} as TOptions) {
		const queryString = this.queryStringify(options.data)
		const fullUrl = queryString ? `${url}?${queryString}` : url

		return this.request(
			fullUrl,
			{
				...options,
				method: METHODS.GET
			},
			options.timeout
		)
	}

	put(url: string, options: TOptions = {} as TOptions) {
		return this.request(url, {...options, method: METHODS.PUT})
	}

	post(url: string, options: TOptions = {} as TOptions) {
		return this.request(url, {...options, method: METHODS.POST})
	}

	delete(url: string, options: TOptions = {} as TOptions) {
		return this.request(url, {...options, method: METHODS.DELETE})
	}

	request(url: string, options: TOptions = {} as TOptions, timeout: number = 5000) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.open(options.method, url)

			if (options.headers) {
				Object.keys(options.headers).forEach((key) => {
					xhr.setRequestHeader(key, options.headers[key])
				})
			}

			xhr.onerror = () => reject(new Error('Network error'))
			xhr.ontimeout = () => reject(new Error('Timeout error'))
			xhr.onabort = () => reject(new Error('Request aborted'))

			xhr.timeout = timeout

			if (options.method === METHODS.GET) {
				xhr.send()
			} else {
				const requestData =
					typeof options.data === 'object' ? JSON.stringify(options.data) : options.data
				xhr.setRequestHeader('Content-Type', 'application/json')
				xhr.send(requestData)
			}

			xhr.onload = () => {
				console.log(xhr)
				resolve(xhr)
			}
		})
	}
}
