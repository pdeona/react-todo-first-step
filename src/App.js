// @flow
import React, { PureComponent } from 'react'
import TodoList from './components/TodoList'
import type { TodoType } from './components/TodoList'
import './App.css'

type AppState = {|
  todos: Array<TodoType>
|}

type CountFn<T> = (list: Array<T>, predicate: (listItem: T) => boolean) => number
const count: CountFn<any> = (list, predicate) => list.reduce(
  (acc, item) => (predicate(item) ? acc + 1 : acc),
  0,
)

class App extends PureComponent<any, AppState> {
  state: AppState = {
    todos: [],
  }

  addTodo = (todo: TodoType): void => this.setState(state => ({
    ...state,
    todos: state.todos.concat(todo),
  }))

  removeTodo = (todoID: number): void => this.setState(state => ({
    ...state,
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

    this.setState(state => ({
      ...state,
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
          Completed: {count(todos, todo => !!todo.completed)}
        </span>
      </div>
    )
  }
}

export default App
