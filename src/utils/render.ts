import Block from './Block'

export function render(page: Block) {
	const root = document.querySelector('#app')!

	root.innerHTML = ''

	root.append(page.getContent()!)
	page.dispatchComponentDidMount()
}
