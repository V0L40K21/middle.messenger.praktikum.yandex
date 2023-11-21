import template from './templates/test.hbs'
import './styles/main.scss'

const data = {
	title: 'My Vite App',
	greeting: 'Hello, Vite!'
}

const renderedHTML = template(data)

// document.getElementById('app').innerHTML = renderedHTML
