// @flow
import React, { PureComponent } from 'react'
import type { Element } from 'react'
import compose from 'lodash/fp/compose'
import NewTodoForm from './TodoForm'
import Todo from './TodoItem'
import type { TodoType } from './TodoItem'
// $FlowIssue For some reason scss import is messing up flow type
import './style.scss'

export type TodoListProps = {|
  todos: Array<TodoType>,
  onAddTodo: (todo: TodoType) => void,
  onRemoveTodo: (todoID: number) => void,
  onCompleteTodo: (todoID: number) => void,
  onResetTodos: () => void,
|}

const newTodo = (text: string): TodoType => ({
  id: new Date().getTime(),
  text,
  completed: false,
})

export type Predicate<T> = (item: T) => boolean
type CountFn<K> = (list: Array<K>, predicate: Predicate<K>) => number

const count: CountFn<*> = (list, predicate) => list.reduce(
  (acc, item) => (predicate(item) ? acc + 1 : acc),
  0,
)

class TodoList extends PureComponent<TodoListProps> {
  onSubmitTodo: (text: string) => void = compose(this.props.onAddTodo, newTodo)

  onRemoveTodo = (todoID: number) => () => this.props.onRemoveTodo(todoID)

  onCompleteTodo = (todoID: number) => () => this.props.onCompleteTodo(todoID)

  renderTodos = (todos: Array<TodoType>): Array<Element<typeof Todo>> =>
    todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onCompleted={this.onCompleteTodo(todo.id)}
        onRemove={this.onRemoveTodo(todo.id)}
      />
    ))

  render() {
    const { todos, onResetTodos } = this.props

    return (
      <div className="todo-container">
        <NewTodoForm onSubmit={this.onSubmitTodo} />
        {this.renderTodos(todos)}
        <span className="status-text">
          Total: {todos.length}
          <br />
          Completed: {count(todos, todo => !!todo.completed)}
        </span>
        <button onClick={onResetTodos}>Reset List</button>
      </div>
    )
  }
}

export default TodoList
