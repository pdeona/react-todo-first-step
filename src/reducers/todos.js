// @flow
import { List } from 'immutable'
import createReducer from 'util/createReducer'
import type { Reducer } from 'util/createReducer'
import type { TodoType } from 'components/TodoList'
import type { TodoAction } from 'actions/todos'

type TodoState = List<TodoType>
const initialState: TodoState = new List()

type UpdateTodos = (todo: TodoType) => TodoType

const handlers: { [key: TodoAction]: Reducer<TodoState, TodoAction> } = {
  ADDED_TODO: (state, { payload }) => state.push(payload),
  REMOVED_TODO: (state, { payload }) => {
    const removeTodo = (todo: TodoType): boolean => (payload !== todo.id)
    return state.filter(removeTodo)
  },
  COMPLETED_TODO: (state, { payload }) => {
    const newTodo = Object.assign({}, payload, { completed: !payload.completed })
    const updateTodos: UpdateTodos = todo => (todo.id === payload.id
      ? newTodo
      : todo)

    return state.map(updateTodos)
  },
  RESET_TODOS: () => initialState,
}

const todosReducer: Reducer<TodoState, TodoAction> = createReducer(
  initialState,
  handlers,
)

export default todosReducer
