export const getVisibleTodos = (todos, filter, blockId) => {
    const filteredTodos = todos.filter(todo => todo.blockId === blockId)

    switch (filter) {
        case 'SHOW_ALL':
            return filteredTodos
        case 'SHOW_COMPLETED':
            return filteredTodos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return filteredTodos.filter(t => !t.completed)
    }
}