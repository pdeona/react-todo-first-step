// @flow
import type { Map, List } from 'immutable'

export type Action = {| type: string, payload?: any |}
export type Reducer<S, A> = (state: S, action: A) => S
export type AppState = Map<{| todos: List |}>
export type ReducerMap<S, A> = { [key: string]: Reducer<S, A> }

const createReducer =
  <S, A: Action>(initialState: S, handlers: ReducerMap<S, A>): Reducer<S, A> => (state: S = initialState, action: A): S => {
    const handler: ?Reducer<S, A> = handlers[action.type]
    if (handler) {
      return handler(state, action)
    }
    return state
  }

export default createReducer
