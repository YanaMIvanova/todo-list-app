import React, { Component } from 'react'
import PropTypes from "prop-types"

class TodoBlockHeader extends Component {
    render() {
        const {
            title,
            toggleChangeTitleForm,
            closeTodoBlock,
            checkIsExpanded
        } = this.props

        return <div
            className="todoblock-header"
        >
            {title}
            &nbsp;
            {checkIsExpanded && (
                <button onClick={toggleChangeTitleForm}>
                    <i
                        className="fa fa-edit"
                    />
                    Rename
                </button>
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
    closeTodoBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default TodoBlockHeader