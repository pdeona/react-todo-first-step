// @flow
import React, { PureComponent } from 'react'

type $FormData = any

type FormProps = {
  onSubmit: (data: $FormData) => void,
}

type FormState = {
  text: string,
}

class TodoForm extends PureComponent<FormProps, FormState> {
  state: FormState = {
    text: '',
  }

  onChangeText = ({ target: { value } }: SyntheticInputEvent<HTMLInputElement>) => this.setState({
    text: value,
  })

  onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState(state => ({
      ...state,
      text: '',
    }))
  }

  render() {
    const { text } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="newTodo">
          Add New Todo:
          <input
            id="newTodo"
            type="text"
            placeholder="Add a new item"
            value={text}
            onChange={this.onChangeText}
            className="new-todo-input"
          />
        </label>
        <button type="submit">add</button>
      </form>
    )
  }
}

export default TodoForm
