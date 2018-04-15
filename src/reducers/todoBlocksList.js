import { createSelector }from "reselect";
import { actionTypes } from "../constants";
import todoBlockItem, { todoBlockIdGenerator, initialState as todoBlockItemInitialState } from "./todoBlockItem";

const initialState = {
    currentTodoBlockId: "0",
    todoBlocksIds: ["0"],
    todoBlocksById: {
        "0": todoBlockItemInitialState
    }
}

const todosBlocks = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO_BLOCK:
            let todoBlockId = todoBlockIdGenerator()

            return {
                ...state,
                currentTodoBlockId: todoBlockId,
                todoBlocksIds: [...state.todoBlocksIds, todoBlockId],
                todoBlocksById: {
                    ...state.todoBlocksById,
                    [todoBlockId]: {...todoBlockItemInitialState, id: todoBlockId}
                }
            }
        case actionTypes.REMOVE_TODO_BLOCK:
            return {
                ...state,
                todoBlocksIds: state.todoBlocksIds.filter(id => id !== action.id),
                currentTodoBlockId:  state.currentTodoBlockId === action.id
                    ? state.currentTodoBlockId === state.todoBlocksIds[0]
                        ? state.todoBlocksIds[1]
                        : state.todoBlocksIds[0]
                    : state.currentTodoBlockId,
                todoBlocksById: (() => {
                    const {[action.id]: _actionid, ...rest} = state.todoBlocksById
                    return rest
                })()
            }
        case actionTypes.SET_CURRENT_TODO_BLOCK:
            return {
                ...state,
                currentTodoBlockId: action.id
            }
        case actionTypes.SET_VISIBILITY_FILTER:
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

export const todoBlocksSelector = createSelector(
    todoBlocksIdsSelector,
    todoBlocksByIdSelector,
    (ids, byId) => ids.map(id => byId[id])
)
