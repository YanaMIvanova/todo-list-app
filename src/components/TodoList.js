import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = ({ todos, toggleTodo, removeTodo }) => (
    <div>
        <ul>
            {todos.map(todo => (
                <div key={todo.id}>
                    <hr/>
                    <TodoItem
                        {...todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                    />
                </div>
            ))}
        </ul>
    </div>
)

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
}

export default TodoList