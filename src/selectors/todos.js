// @flow
import { createSelector } from 'reselect'
import type { OutputSelector } from 'reselect'
import type { AppState, TodoState } from 'actions/types'
import type { TodoType, Predicate } from 'components/TodoList'
import { makeSelectFrom, makeSelectTo } from './dates'

type TodoSelector = (state: AppState) => TodoState
const rootSelect: TodoSelector = state => state.get('todos')

type MaybeFilter = { from: ?number, to: ?number }
type MakeSelectTodos = () => OutputSelector<*, AppState, Array<*>>
type MakeSelectFilteredTodos = () => $Call<MakeSelectTodos>
type MaybeCompare = (a: ?number, b: ?number) => boolean
type MaybeCompareFactory = ((a: number, b: number) => boolean) => MaybeCompare
type DatePredicate<T> = (input: MaybeFilter) => Predicate<T>

const maybeCompare: MaybeCompareFactory = compare => (a, b) => ((!a || !b) ? true : compare(a, b))
const maybeGreaterThan: MaybeCompare = maybeCompare((a, b) => a > b)
const maybeLessThan: MaybeCompare = maybeCompare((a, b) => a < b)

const filterByDates: DatePredicate<TodoType> = ({ from, to }) => todo =>
  (maybeGreaterThan(todo.id, from) && maybeLessThan(todo.id, to))

const makeSelectTodos: MakeSelectTodos = () => createSelector(
  rootSelect,
  (todos: TodoState): Array<*> => todos.toJS(),
)

const makeSelectFilteredTodos: MakeSelectFilteredTodos = () => createSelector(
  rootSelect,
  makeSelectFrom(),
  makeSelectTo(),
  (todos: TodoState, from, to): Array<*> => {
    const filter = {
      from: from ? Date.parse(from) : null,
      to: to ? Date.parse(to) : null,
    }

    return todos.filter(filterByDates(filter)).toJS()
  },
)

export {
  makeSelectTodos,
  makeSelectFilteredTodos,
}
