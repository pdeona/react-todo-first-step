// @flow
import { Map } from 'immutable'
import type { DateAction, DateState } from 'actions/types'

const initialState: DateState = Map({ from: null, to: null })

export default function reducer(state: DateState = initialState, action: DateAction): DateState {
  switch (action.type) {
    case 'SELECT_DATES':
      return state.set('from', action.payload.from)
        .set('to', action.payload.to)
    default:
      return state
  }
}
