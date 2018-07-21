// @flow
import React, { PureComponent } from 'react'
import TodoList from 'components/TodoList'
import type { TodoType } from 'components/TodoList'
import './App.css'

type AppState = {|
  todos: Array<TodoType>
|}

type Predicate<T> = (item: T) => boolean
const count = <K>(list: Array<K>, predicate: Predicate<K>): number => list.reduce(
  (acc, item: K): number => (predicate(item) ? acc + 1 : acc),
  0,
)

class App extends PureComponent<any, AppState> {
  state: AppState = {
    todos: [],
  }

  addTodo = (todo: TodoType): void => this.setState(state => ({
    todos: state.todos.concat(todo),
  }))

  removeTodo = (todoID: number): void => this.setState(state => ({
    todos: state.todos.filter((todo: TodoType): boolean => todo.id !== todoID)
  }))

  completeTodo = (todo: TodoType): void => {
    const newStatus: {| completed: boolean |} = { completed: !todo.completed }
    const newTodo: TodoType = Object.assign(
      todo,
      newStatus,
    )
    const updateTodos = existing => (existing.id === todo.id
      ? newTodo
      : existing)
    const newTodos: Array<TodoType> = this.state.todos
      .map(updateTodos)

    this.setState(() => ({
      todos: newTodos,
    }))
  }

  render() {
    const { todos } = this.state

    return (
      <div className="App">
        <TodoList
          todos={todos}
          onAddTodo={this.addTodo}
          onRemoveTodo={this.removeTodo}
          onCompleteTodo={this.completeTodo}
        />
        <span className="status-text">
          Total: {todos.length}
          <br />
          Completed: {count(todos, (todo: TodoType): boolean => !!todo.completed)}
        </span>
      </div>
    )
  }
}

export default App
