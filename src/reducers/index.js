import { combineReducers } from 'redux'
import todos from './todosReducer'
import todoBlocksList, * as fromTodoBlocksList from './todoBlocksList'

const todoApp = combineReducers({
    todos,
    todoBlocksList
})

export default todoApp

export const blocksSelector = state => fromTodoBlocksList.todoBlocksSelector(state.todoBlocksList)

export const currentTodoBlockIdSelector = state => fromTodoBlocksList.currentTodoBlockIdSelector(state.todoBlocksList)
