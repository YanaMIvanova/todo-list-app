import React from 'react'
import PropTypes from 'prop-types'

const AddTodoItemForm = ({ addTodo }) => {
    let input = ''

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (input.value.trim()) {
                        addTodo(input.value)
                        input.value = ''
                    }
                }}
            >
                <input
                    ref={node => input = node}
                    type="text"
                    autoFocus
                />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}

AddTodoItemForm.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodoItemForm