import React, { Component } from 'react'
import PropTypes from "prop-types";

class TodoBlockHeader extends Component {
    render() {
        const { removeTodoBlock, selectTodoBlock, title, toggleChangeTitleForm } = this.props

        return <div
            onClick={selectTodoBlock}
            style={{
                marginBottom: "10px"
            }}
        >
            {title}
            &nbsp;
            <i
                onClick={toggleChangeTitleForm}
                className="fa fa-edit"
            />
            <button
                onClick={removeTodoBlock}
                style={{
                    float: "right"
                }}
            >
                Delete List
            </button>
        </div>
    }
}

TodoBlockHeader.propTypes = {
    title: PropTypes.string.isRequired,
    removeTodoBlock: PropTypes.func.isRequired,
    selectTodoBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default TodoBlockHeader