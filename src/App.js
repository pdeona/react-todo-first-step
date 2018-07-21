// @flow
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'util/configureStore'
import type { Element } from 'react'
import TodoList from 'containers/TodoList'
import './App.css'

const store = configureStore()

const App: () => Element<*> = () => (
  <Provider store={store}>
    <div className="App">
      <TodoList />
    </div>
  </Provider>
)

export default App
