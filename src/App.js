// @flow
import React, { Component } from 'react'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import TodoList from 'components/TodoList'
import type { TodoItem } from 'components/TodoList'
import './App.css'

type Updater<T> = (item: T) => T
type TodoUpdater = Updater<TodoItem>

const flipCompleted: TodoUpdater = item => ({
  id: item.id,
  text: item.text,
  completed: !item.completed,
})

type Predicate<T> = (item: T) => boolean
type Count<T: TodoItem> = (list: T[], predicate: Predicate<T>) => number
const count: Count<TodoItem> = (list, predicate) => list
  .reduce(
    (acc, item) => (predicate(item) ? acc + 1 : acc),
    0,
  )

@observer
class App extends Component<*> {
  @observable todos: TodoItem[] = [] // eslint-disable-line react/sort-comp

  @action addTodo = (todo: TodoItem): void => {
    this.todos = this.todos.concat(todo)
  }

  @action removeTodo = (todoID: number): void => {
    this.todos = this.todos
      .filter((todo: TodoItem): boolean => todo.id !== todoID)
  }

  @action completeTodo = (todo: TodoItem): void => {
    const updateTodos: TodoUpdater = existing => (existing.id === todo.id
      ? flipCompleted(existing)
      : existing)

    this.todos = this.todos.map(updateTodos)
  }

  @computed get totalTodos(): number {
    return this.todos.length
  }

  @computed get completedTodos(): number {
    return count(this.todos, todo => todo.completed)
  }

  render() {
    return (
      <div className="App">
        <TodoList
          todos={this.todos}
          onAddTodo={this.addTodo}
          onRemoveTodo={this.removeTodo}
          onCompleteTodo={this.completeTodo}
        />
        <span className="status-text">
          Total: {this.totalTodos}
          <br />
          Completed: {this.completedTodos}
        </span>
      </div>
    )
  }
}

export default App
