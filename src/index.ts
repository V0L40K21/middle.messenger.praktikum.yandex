import {Input} from './components/input'
import './styles/main.scss'
import {registerComponent} from './utils/registerComponent'
import {render} from './utils/render'

registerComponent('Input', Input)
// registerComponent('Card', Card);

window.addEventListener('DOMContentLoaded', () => {
	render('auth')
})
