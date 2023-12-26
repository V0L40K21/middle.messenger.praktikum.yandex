const METHODS = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE'
}

type TOptions = {
	method?: string
	data?: Record<string, string>
	timeout?: number
	headers?: Record<string, string>
}

export class HTTPTransport {
	queryStringify(data: Record<string, string>) {
		return Object.entries(data ?? {})
			.map(([key, value]) => `${key}=${value}`)
			.join('&')
	}

	get(url: string, options: TOptions = {} as TOptions) {
		const {data} = options
		const queryString = this.queryStringify(data ?? {})
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
		const {method, headers} = options
		return new Promise<XMLHttpRequest>((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			if (method) {
				xhr.open(method, url)
			}

			if (headers) {
				Object.keys(headers).forEach((key) => {
					xhr.setRequestHeader(key, headers[key])
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
