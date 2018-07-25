// @flow
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'util/configureStore'
import type { Element } from 'react'
import TodosByDate from 'containers/TodosByDate'
import './App.css'

const store = configureStore()

const App = (): Element<*> => (
  <Provider store={store}>
    <div className="App">
      <TodosByDate />
    </div>
  </Provider>
)

export default App
