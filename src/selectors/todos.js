// @flow
import { createSelector } from 'reselect'
import type { OutputSelector } from 'reselect'
import type { AppState, TodoState } from 'actions/types'

type TodoSelector = (state: AppState) => TodoState
const rootSelect: TodoSelector = state => state.get('todos')

type MakeSelectTodos = () => OutputSelector<*, AppState, Array<*>>

const makeSelectTodos: MakeSelectTodos = () => createSelector(
  rootSelect,
  (todos: TodoState): Array<*> => todos.toJS(),
)

export default makeSelectTodos
