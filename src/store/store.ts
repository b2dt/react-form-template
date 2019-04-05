import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {rootReducer} from '../reducers/rootReducer'

const preloadedState = (window as any).__PRELOADED_STATE__

delete (window as any).__PRELOADED_STATE__

const configureStore = (initialState?: object) => 
  createStore(
    rootReducer,
    initialState!,
    composeWithDevTools(applyMiddleware(thunk))
  )

const appStore = configureStore(preloadedState)

export {
  appStore
}