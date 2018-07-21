// @flow
import { createSelector } from 'reselect'
import type { InputSelector } from 'reselect'
import type { TodoType } from 'components/TodoList'
import type { AppState } from 'util/createReducer'
import type { List } from 'immutable'

const rootSelect: (state: AppState) => List = state => state.get('todos')

type MakeSelectTodos = () => InputSelector<AppState, *, Array<TodoType>>

const makeSelectTodos: MakeSelectTodos = () => createSelector(
  rootSelect,
  (todos: List): Array<TodoType> => todos.toJS(),
)

export default makeSelectTodos
