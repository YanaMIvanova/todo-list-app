import React, { Component } from 'react'
import PropTypes from "prop-types"

class TodoBlockHeader extends Component {
    render() {
        const {
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
        </div>
    }
}

TodoBlockHeader.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    selectTodoBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default TodoBlockHeader