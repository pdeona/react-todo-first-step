// @flow
import React, { PureComponent } from 'react'
import TodoList from 'components/TodoList'
import type { TodoType } from 'components/TodoList'
import './App.css'

type AppState = {|
  todos: Array<TodoType>
|}

type Updater<T> = (item: T) => T
type TodoUpdater = Updater<TodoType>

const flipCompleted: TodoUpdater = item => ({
  id: item.id,
  text: item.text,
  completed: !item.completed,
})

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
    const updateTodos: TodoUpdater = existing => (existing.id === todo.id
      ? flipCompleted(existing)
      : existing)
    const newTodosState: (state: AppState) => AppState = state => ({
      todos: state.todos.map(updateTodos)
    })

    this.setState(newTodosState)
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
