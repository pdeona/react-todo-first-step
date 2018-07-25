// @flow
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import compose from 'lodash/fp/compose'
import TodoList from 'components/TodoList'
import type { TodoListProps } from 'components/TodoList'
import SelectDates from 'containers/SelectDates'
import { addTodo, removeTodo, completeTodo, resetTodos } from 'actions/todos'
import type { TodoAction, Dispatch } from 'actions/types'
import { makeSelectFilteredTodos } from 'selectors/todos'

const mapStateToProps = createStructuredSelector({
  todos: makeSelectFilteredTodos(),
})

type MapDispatchToProps = (dispatch: Dispatch<TodoAction>) => ($Rest<TodoListProps, {| todos: $PropertyType<TodoListProps, 'todos'> |}>)

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  onAddTodo: compose(dispatch, addTodo),
  onRemoveTodo: compose(dispatch, removeTodo),
  onCompleteTodo: compose(dispatch, completeTodo),
  onResetTodos: () => dispatch(resetTodos()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const FilteredTodos = withConnect(TodoList)

const TodosWithDateForm = () => (
  <SelectDates>
    <FilteredTodos />
  </SelectDates>
)

export default TodosWithDateForm
