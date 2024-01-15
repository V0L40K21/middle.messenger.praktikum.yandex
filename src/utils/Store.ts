import {TSocketMessage, TUser} from '../api/types'
import Block from './Block'
import {EventBus} from './EventBus'
import Helpers from './Helpers'

export enum StoreEvents {
	Updated = 'updated'
}

type TState = {
	user: TUser | null
	error: string | null
	chats: any // TODO: ChatProps
	messages: Record<number, TSocketMessage[]>
	chatUsers: (TUser & {role: string})[]
	selectedChat: any // TODO: ChatProps
	messageUser?: string
}

const initialState: TState = {
	user: null,
	error: null,
	messages: {},
	chats: [
		{
			name: 'Andrey',
			message: 'Hello world',
			time: '18:22'
		}
	],
	chatUsers: [],
	selectedChat: null
}

export class Store extends EventBus {
	private state: TState = initialState

	public set(keypath: string, data: unknown) {
		Helpers.set(this.state, keypath, data)

		this.emit(StoreEvents.Updated, this.getState())
	}

	public getState() {
		return this.state
	}
}

const store = new Store()

export function withStore(mapStateToProps: (state: TState) => any) {
	return function wrap(Component: typeof Block) {
		let previousState: any
		return class WithStore extends Component {
			constructor(props: any) {
				previousState = mapStateToProps(store.getState())
				super({...props, ...previousState})
				store.on(StoreEvents.Updated, () => {
					const stateProps = mapStateToProps(store.getState())
					previousState = stateProps
					this.setProps({...stateProps})
				})
			}
		}
	}
}

export default store
