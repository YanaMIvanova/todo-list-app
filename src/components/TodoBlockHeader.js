import React, { Component } from 'react'
import PropTypes from "prop-types"

class TodoBlockHeader extends Component {
    render() {
        const {
            deleteTodoBlock,
            selectTodoBlock,
            title,
            toggleChangeTitleForm,
            isExpanded
        } = this.props

        return <div
            onClick={selectTodoBlock}
            className="todoblock-header"
        >
            {title}
            &nbsp;
            {isExpanded && (
                <i
                    onClick={toggleChangeTitleForm}
                    className="fa fa-edit"
                />
            )}
            <button
                onClick={deleteTodoBlock}
                className="todoblock-delete-button"
            >
                Delete List
            </button>
        </div>
    }
}

TodoBlockHeader.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    deleteTodoBlock: PropTypes.func.isRequired,
    selectTodoBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default TodoBlockHeader