import React, { Component } from 'react'
import PropTypes from "prop-types"

class TodoBlockHeader extends Component {
    render() {
        const {
            selectTodoBlock,
            title,
            toggleChangeTitleForm,
            closeTodoBlock,
            checkIsExpanded
        } = this.props

        return <div
            onClick={selectTodoBlock}
            className="todoblock-header"
        >
            {title}
            &nbsp;
            {checkIsExpanded && (
                <i
                    onClick={toggleChangeTitleForm}
                    className="fa fa-edit"
                />
            )}
            <button
                style={{
                    float: "right"
                }}
                onClick={closeTodoBlock}
            >
                Close
            </button>
        </div>
    }
}

TodoBlockHeader.propTypes = {
    checkIsExpanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    selectTodoBlock: PropTypes.func.isRequired,
    closeTodoBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default TodoBlockHeader