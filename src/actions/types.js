// @flow
import type { List, RecordOf } from 'immutable'
import type { TodoType } from 'components/TodoList'

export type Action =
  | { type: 'ADDED_TODO', payload: TodoType }
  | { type: 'REMOVED_TODO', payload: number }
  | { type: 'COMPLETED_TODO', payload: number }
  | { type: 'RESET_TODOS' }

export type TodoState = List<TodoType>
export type AppState = RecordOf<{ todos: TodoState }>
export type Dispatch<A: Action> = (a: A) => void
export type Reducer<State, Act> = (state: State, action: Act) => State
