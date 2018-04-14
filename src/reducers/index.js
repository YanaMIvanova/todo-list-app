import { combineReducers } from 'redux'
import todos from './todosReducer'
import todoBlocks from './todoBlocksReducer'

const todoApp = combineReducers({
    todos,
    todoBlocks
})

export default todoApp
