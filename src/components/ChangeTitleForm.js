import React from 'react'
import PropTypes from 'prop-types'

const ChangeTitleForm = ({ setTodoBlockTitle, toggleChangeTitleForm }) => {
    let input = ''

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                if (input.value.trim()) {
                    setTodoBlockTitle(input.value)
                    toggleChangeTitleForm()
                }
                input.value = ''
            }}
        >
            <input
                type="text"
                ref={node => input = node}
                autoFocus
            />
            <button type="submit">
                Change Title
            </button>
        </form>
    )
}

ChangeTitleForm.propTypes = {
    setTodoBlockTitle: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default ChangeTitleForm