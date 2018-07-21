// @flow
import type { TodoType } from 'components/TodoList'

type AddTodoAction = { type: 'ADDED_TODO', payload: TodoType }
type RemoveTodoAction = { type: 'REMOVED_TODO', payload: string }
type CompleteTodoAction = { type: 'COMPLETED_TODO', payload: TodoType }
type ResetTodosAction = { type: 'RESET_TODOS' }

export type TodoAction =
  | AddTodoAction
  | RemoveTodoAction
  | CompleteTodoAction
  | ResetTodosAction

export const addTodo: (todo: TodoType) => AddTodoAction = todo => ({
  type: 'ADDED_TODO',
  payload: todo,
})

export const removeTodo: (todoID: string) => RemoveTodoAction = todoID => ({
  type: 'REMOVED_TODO',
  payload: todoID,
})

export const completeTodo: (todo: TodoType) => CompleteTodoAction = todo => ({
  type: 'COMPLETED_TODO',
  payload: todo,
})

export const resetTodos: () => ResetTodosAction = () => ({
  type: 'RESET_TODOS',
})
