// @flow
import React from 'react'

type TodoItem = {|
  id: number,
  text: string,
  completed: boolean,
|}

type TodoProps = {|
  todo: TodoItem,
  onCompleted: () => void,
  onRemove: () => void,
|}

const Todo = ({ todo, onCompleted, onRemove }: TodoProps) => (
  <div className="todo-item">
    <p>{todo.text}</p>
    <label htmlFor={todo.id}>
      <input id={todo.id} type="checkbox" defaultChecked={todo.completed} onClick={onCompleted} />
      Completed
    </label>
    <button onClick={onRemove}>Remove</button>
  </div>
)

export type { TodoItem }
export default Todo
