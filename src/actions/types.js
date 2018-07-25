// @flow
import type { List, RecordOf } from 'immutable'
import type { TodoType } from 'components/TodoList'

export type TodoAction =
  | { type: 'ADDED_TODO', payload: TodoType }
  | { type: 'REMOVED_TODO', payload: number }
  | { type: 'COMPLETED_TODO', payload: number }
  | { type: 'RESET_TODOS' }

export type DateRange = {| from: ?Date, to: ?Date |}

export type DateAction =
  | { type: 'SELECT_DATES', payload: DateRange }

export type TodoState = List<TodoType>
export type DateState = Map<*, *>
export type AppState = RecordOf<{ todos: TodoState, dates: DateState }>
export type Dispatch<A> = (a: A) => void
export type Reducer<State, Act> = (state: State, action: Act) => State
