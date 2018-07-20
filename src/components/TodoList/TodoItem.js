// @flow
import React, { PureComponent } from 'react'

type TodoType = {|
  id: number,
  text: string,
  completed: boolean,
|}

type TodoProps = {|
  todo: TodoType,
  onCompleted: (todo: TodoType) => void,
  onRemove: () => void,
|}

class Todo extends PureComponent<TodoProps> {
  onCompleteTodo = () => {
    const { todo, onCompleted } = this.props
    return onCompleted(todo)
  }

  render() {
    const { todo, onRemove } = this.props

    return (
      <div className="todo-item">
        <p>{todo.text}</p>
        <label htmlFor={todo.id}>
          <input id={todo.id} type="checkbox" defaultChecked={todo.completed} onClick={this.onCompleteTodo} />
          Completed
        </label>
        <button onClick={onRemove}>Remove</button>
      </div>
    )
  }
}

export type { TodoType }
export default Todo
