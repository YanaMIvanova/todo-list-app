export const visibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const actionTypes = {
    ADD_TODO: 'ADD_TODO',
    ADD_TODO_TO_STORAGE: 'ADD_TODO_TO_STORAGE',
    TOGGLE_TODO: 'TOGGLE_TODO',
    DELETE_TODO: 'DELETE_TODO',
    FETCH_URGENT_TODOS: 'FETCH_URGENT_TODOS',

    ADD_TODO_BLOCK: 'ADD_TODO_BLOCK',
    CLOSE_TODO_BLOCK: 'CLOSE_TODO_BLOCK',
    SAVE_TODO_BLOCK_TO_STORAGE: 'SAVE_TODO_BLOCK_TO_STORAGE',
    DELETE_TODO_BLOCK: 'DELETE_TODO_BLOCK',
    SET_CURRENT_TODO_BLOCK: 'SET_CURRENT_TODO_BLOCK',
    SET_TODO_BLOCK_TITLE: 'SET_TODO_BLOCK_TITLE',

    SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
};
