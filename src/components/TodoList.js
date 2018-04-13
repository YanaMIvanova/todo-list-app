import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, toggleTodo, removeTodo }) => (
    <div>
        <ul>
            {todos.map(todo => (
                <div>
                    <hr/>
                    <Todo
                        key={todo.id}
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
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
}

export default TodoList