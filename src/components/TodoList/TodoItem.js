// @flow
import React from 'react'

type TodoType = {|
  id: number,
  text: string,
  completed: boolean,
|}

type TodoProps = {|
  todo: TodoType,
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

export type { TodoType }
export default Todo
