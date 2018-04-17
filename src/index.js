import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import App from './components/App'
import rootSaga from "./saga"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    // window.__REDUX_DEVTOOLS_EXTENSION__
    // && window.__REDUX_DEVTOOLS_EXTENSION__(),
    rootReducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)