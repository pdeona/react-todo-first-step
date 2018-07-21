/**
 * Create the store with dynamic reducers
 */
import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
// import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import todosReducer from 'reducers/todos'

// const sagaMiddleware = createSagaMiddleware()
export default function configureStore(initialState = {}) {
  // Store middleware:
  //   - sagaMiddleware: Makes redux-sagas work
  const middlewares = [
    // sagaMiddleware,
  ]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose
  /* eslint-enable */
  const injectedReducers = {
    todos: todosReducer,
  }

  const store = createStore(
    combineReducers(injectedReducers),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  )

  // Extensions
  // store.runSaga = sagaMiddleware.run
  store.injectedReducers = injectedReducers // Reducer registry
  store.injectedSagas = {} // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // $FlowIssue webpack adds module.hot for us in development
  if (module.hot) {
    module.hot.accept('../reducers/todos', () => {
      store.replaceReducer(combineReducers(store.injectedReducers))
    })
  }

  return store
}
