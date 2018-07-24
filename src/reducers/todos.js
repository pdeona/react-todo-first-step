// @flow
import { List } from 'immutable'
import type { TodoType, Predicate } from 'components/TodoList'
import type { Action, Reducer, TodoState } from 'actions/types'

const initialState: TodoState = new List()

type UpdateTodo = (todo: TodoType) => TodoType
type FilterTodo = Predicate<TodoType>

const flipCompleted: UpdateTodo = todo => ({
  id: todo.id,
  text: todo.text,
  completed: !todo.completed,
})

/**
 * [Flow]
 *  setCompleted: ({
 *    payload: number,
 *    type: "COMPLETED_TODO"
 *  }) => UpdateTodo
 */
const setCompleted = ({ payload }: *): UpdateTodo => todo => (
  todo.id === payload
    ? flipCompleted(todo)
    : todo
)

/**
 * [Flow]
 *  removeSelected: ({
 *    payload: number,
 *    type: "REMOVED_TODO"
 *  }) => FilterTodo
 */
const removeSelected = ({ payload }: *): FilterTodo => todo => (
  todo.id !== payload
)

const todosReducer: Reducer<TodoState, Action> =
  (state = initialState, action) => {
    switch (action.type) {
      case 'ADDED_TODO':
        return state.push(action.payload)
      case 'REMOVED_TODO':
        return state.filter(removeSelected(action))
      case 'COMPLETED_TODO':
        return state.map(setCompleted(action))
      case 'RESET_TODOS':
        return initialState
      default:
        return state
    }
  }

export default todosReducer
