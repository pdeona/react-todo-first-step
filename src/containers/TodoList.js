// @flow
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import compose from 'lodash/fp/compose'
import TodoList from 'components/TodoList'
import {
  addTodo,
  completeTodo,
  removeTodo,
  resetTodos,
} from 'actions/todos'
import type { TodoAction } from 'actions/todos'
import makeSelectTodos from 'selectors/todos'

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
})

const mapDispatchToProps = (dispatch: (action: TodoAction) => void) => ({
  onAddTodo: compose(dispatch, addTodo),
  onRemoveTodo: compose(dispatch, removeTodo),
  onCompleteTodo: compose(dispatch, completeTodo),
  onResetTodos: () => dispatch(resetTodos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
