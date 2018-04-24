import { combineReducers } from 'redux'
import todos from './todos'
import todoBlocksList, * as fromTodoBlocksList from './todoBlocksList'

const todoApp = combineReducers({
    todos,
    todoBlocksList
})

export default todoApp

export const blocksSelector = state => fromTodoBlocksList.todoBlocksSelector(state.todoBlocksList)

export const closedTodoBlocksSelector = state => fromTodoBlocksList.closedTodoBlocksSelector(state.todoBlocksList)

export const todoBlockSelector = (state, id) =>
    fromTodoBlocksList.todoBlockSelector(state.todoBlocksList.todoBlocksById, id)

export const currentTodoBlockIdSelector = state => fromTodoBlocksList.currentTodoBlockIdSelector(state.todoBlocksList)

export const currentTodoBlockSelector = state => fromTodoBlocksList.currentTodoBlockSelector(state.todoBlocksList)
