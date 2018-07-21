// @flow
import React, { PureComponent } from 'react'
import type { Element } from 'react'
import compose from 'lodash/fp/compose'
import NewTodoForm from './TodoForm'
import Todo from './TodoItem'
import type { TodoType } from './TodoItem'
import './style.scss'

type TodoListProps = {|
  todos: Array<TodoType>,
  onAddTodo: (todo: TodoType) => void,
  onRemoveTodo: (todoID: number) => void,
  onCompleteTodo: (todo: TodoType) => void,
|}

const newTodo = (text: string): TodoType => ({
  id: new Date().getTime(),
  text,
  completed: false,
})

class TodoList extends PureComponent<TodoListProps> {
  onSubmitTodo: (text: string) => void = compose(this.props.onAddTodo, newTodo)

  onRemoveTodo = (todoID: number) => () => this.props.onRemoveTodo(todoID)

  onCompleteTodo = (todo: TodoType) => () => this.props.onCompleteTodo(todo)

  renderTodos = (todos: Array<TodoType>): Array<Element<typeof Todo>> =>
    todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onCompleted={this.onCompleteTodo(todo)}
        onRemove={this.onRemoveTodo(todo.id)}
      />
    ))

  render() {
    const { todos } = this.props

    return (
      <div className="todo-container">
        <NewTodoForm onSubmit={this.onSubmitTodo} />
        {this.renderTodos(todos)}
      </div>
    )
  }
}

export default TodoList
