// @flow
import React, { PureComponent } from 'react'
import TodoList from './components/TodoList'
import type { TodoType } from './components/TodoList'
import './App.css'

type AppState = {|
  todos: Array<TodoType>
|}

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
    const newTodos: Array<TodoType> = this.state.todos
      .filter((existing: TodoType): boolean => (existing.id !== todo.id))
      .concat(newTodo)

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
      </div>
    )
  }
}

export default App
