// @flow
import { combineReducers } from 'redux-immutable'
import dates from './dates'
import todos from './todos'

type ReducerSet = {|
  todos: typeof todos,
  dates: typeof dates,
|}

type RootReducer = $Call<typeof combineReducers, ReducerSet>

const combinedReducer: RootReducer = combineReducers({
  todos,
  dates,
})

export default combinedReducer
