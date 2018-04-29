import { createSelector }from "reselect";
import { actionTypes } from "../constants";
import todoBlockItem from "./todoBlockItem";

const initialState = {
    currentTodoBlockId: "",
    todoBlocksIds: [],
    todoBlocksById: {},
    closedTodoBlocks: [],
}

const todosBlocks = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO_BLOCK:
            return {
                ...state,
                currentTodoBlockId: action.todoBlock.id,
                todoBlocksIds: [action.todoBlock.id, ...state.todoBlocksIds],
                todoBlocksById: {
                    [action.todoBlock.id]: action.todoBlock,
                    ...state.todoBlocksById
                }
            }
        case actionTypes.SET_CLOSED_TODO_BLOCKS:
            return {
                ...state,
                closedTodoBlocks: action.blocks
            }
        case actionTypes.REMOVE_TODO_BLOCK: {
            const {[action.blockId]: _blockId, ...rest} = state.todoBlocksById

            return {
                ...state,
                todoBlocksById: rest,
                todoBlocksIds: state.todoBlocksIds.filter(id => id !== action.blockId)
            }
        }
        case actionTypes.DELETE_TODO_BLOCK: {
            const {[action.blockId]: _blockId, ...rest} = state.todoBlocksById

            return {
                ...state,
                todoBlocksIds: state.todoBlocksIds.filter(id => id !== action.blockId),
                currentTodoBlockId: state.currentTodoBlockId === action.blockId
                    ? state.currentTodoBlockId === state.todoBlocksIds[0]
                        ? state.todoBlocksIds[1]
                        : state.todoBlocksIds[0]
                    : state.currentTodoBlockId,
                todoBlocksById: rest
            }
        }
        case actionTypes.SET_CURRENT_TODO_BLOCK:
            return {
                ...state,
                currentTodoBlockId: action.blockId
            }
        case actionTypes.SET_VISIBILITY_FILTER:
            return {
                ...state,
                todoBlocksById: {
                    ...state.todoBlocksById,
                    [action.blockId]: todoBlockItem(state.todoBlocksById[action.blockId], action)
                }
            }
        case actionTypes.SET_TODO_BLOCK_TITLE:
            return {
                ...state,
                todoBlocksById: {
                    ...state.todoBlocksById,
                    [action.blockId]: todoBlockItem(state.todoBlocksById[action.blockId], action)
                }
            }
        default:
            return state
    }
}

export default todosBlocks

export const currentTodoBlockIdSelector = state => state.currentTodoBlockId

export const todoBlocksIdsSelector = state => state.todoBlocksIds

export const todoBlocksByIdSelector = state => state.todoBlocksById

export const closedTodoBlocksSelector = state => state.closedTodoBlocks

export const todoBlockSelector = (state, id) => state[id]

export const todoBlocksSelector = createSelector(
    todoBlocksIdsSelector,
    todoBlocksByIdSelector,
    (ids, byId) => ids.map(id => byId[id])
)

export const currentTodoBlockSelector = createSelector(
    todoBlocksByIdSelector,
    currentTodoBlockIdSelector,
    (todoBlocks, currentTodoBlockId) => todoBlocks[currentTodoBlockId]
)
