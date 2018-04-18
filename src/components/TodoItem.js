import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({ toggleTodo, deleteTodo, completed, text, id }) => {
    return <div>
        <li
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {text}
        </li>
        <div>
            <button onClick={() => toggleTodo(id)}>{!completed ? "Mark as completed" : "Mark as active"}</button>
            &nbsp;
            <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    </div>
}

TodoItem.propTypes = {
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default TodoItem