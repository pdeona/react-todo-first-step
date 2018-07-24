// @flow
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import compose from 'lodash/fp/compose'
import TodoList from 'components/TodoList'
import type { TodoListProps } from 'components/TodoList'
import { addTodo, removeTodo, completeTodo, resetTodos } from 'actions/todos'
import type { Action, Dispatch } from 'actions/types'
import makeSelectTodos from 'selectors/todos'

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
})

type MapDispatchToProps = (dispatch: Dispatch<Action>) => ($Rest<TodoListProps, {| todos: $PropertyType<TodoListProps, 'todos'> |}>)

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  onAddTodo: compose(dispatch, addTodo),
  onRemoveTodo: compose(dispatch, removeTodo),
  onCompleteTodo: compose(dispatch, completeTodo),
  onResetTodos: () => dispatch(resetTodos()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withConnect(TodoList)

/**
 * [Flow]
 *  dispatch: Dispatch < ({ | type: "RESET_TODOS" |}
 *   | {| payload: TodoType, type: "COMPLETED_TODO" |}
 *   | {| payload: TodoType, type: "ADDED_TODO" |}
 *   | {| payload: string, type: "REMOVED_TODO" |}>
 */
