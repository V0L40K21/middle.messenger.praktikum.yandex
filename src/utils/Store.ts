import {TUser} from '../api/types'
import Block from './Block'
import {EventBus} from './EventBus'
import Helpers from './Helpers'

export enum StoreEvents {
	Updated = 'updated'
}

type TState = {
	user: TUser | null
}

export class Store extends EventBus {
	private state: TState = {} as TState

	public set(keypath: string, data: unknown) {
		Helpers.set(this.state, keypath, data)

		this.emit(StoreEvents.Updated, this.getState())
	}

	public getState() {
		return this.state
	}
}

const store = new Store()

export function withStore<SP>(mapStateToProps: (state: TState) => SP) {
	return function wrap<P>(Component: typeof Block<SP & P>) {
		return class WithStore extends Component {
			constructor(props: Omit<P, keyof SP>) {
				let previousState = mapStateToProps(store.getState())

				super({...(props as P), ...previousState})

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
