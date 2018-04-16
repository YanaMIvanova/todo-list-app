import { actionTypes, visibilityFilters } from "../constants";
const { SHOW_ALL } = visibilityFilters

const idGenerator = (id = 0) => () => `${id++}`

export const todoBlockIdGenerator = idGenerator()

export const initialState = {
    id: todoBlockIdGenerator(),
    visibilityFilter: SHOW_ALL,
    title: "New List"
}

const todoBlockItem = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_VISIBILITY_FILTER:
            return {
                ...state,
                visibilityFilter: action.filter
            }
        case actionTypes.SET_TODO_BLOCK_TITLE:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}

export default todoBlockItem