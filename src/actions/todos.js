// @flow
import type { TodoType } from 'components/TodoList'
import type { TodoAction as Action } from './types'

export const addTodo = (todo: TodoType): Action => ({
  type: 'ADDED_TODO',
  payload: todo,
})

export const removeTodo = (todoID: number): Action => ({
  type: 'REMOVED_TODO',
  payload: todoID,
})

export const completeTodo = (todoID: number): Action => ({
  type: 'COMPLETED_TODO',
  payload: todoID,
})

export const resetTodos = (): Action => ({
  type: 'RESET_TODOS',
})
