import React from 'react'
import PropTypes from "prop-types";

const DeleteTodoBlockButton = ({ deleteBlock }) => (
    <button
        onClick={deleteBlock}
        className="todoblock-delete-button"
    >
        Delete List
    </button>
)

DeleteTodoBlockButton.propTypes = {
    deleteBlock: PropTypes.func.isRequired
}


export default DeleteTodoBlockButton