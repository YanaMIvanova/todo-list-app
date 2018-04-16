import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { loadState, saveState } from './localStorage'
import App from './components/App'

const persistedState = loadState()

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    saveState(store.getState())
})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)