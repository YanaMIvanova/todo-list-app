import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodoBlockFromStorage, setCurrentTodoBlock } from "../actions/todoBlocks";
import { fetchUrgentTodos } from "../actions/todos";
import { blocksSelector, currentTodoBlockIdSelector } from '../reducers'
import AddTodoBlockButton from '../components/AddTodoBlockButton'
import TodoBlock from '../components/TodoBlock'

class TodoBlockContainer extends Component {
    state = {
        showChangeTitleForm: false
    }

    handleDeleteBlock = id => event => {
        const { deleteTodoBlock } = this.props
        event.stopPropagation()

        deleteTodoBlock(id)
    }

    handleSelectBlock = id => _event => {
        const { selectTodoBlock } = this.props

        selectTodoBlock(id)
    }

    handleToggleChangeTitleForm = () => {
        this.setState({
            showChangeTitleForm: !this.state.showChangeTitleForm
        })
    }

    isExpanded = (blockId) => {
        const { currentBlockId } = this.props

        return currentBlockId === blockId
    }

    render() {
        const { blocks, currentBlockId, getUrgentTodos } = this.props

        return (
            <div
                className="todoblocks"
            >
                {
                    blocks.map(block =>
                        <TodoBlock
                            key={block.id}
                            block={block}
                            currentBlockId={currentBlockId}
                            isExpanded={this.isExpanded}
                            showChangeTitleForm={this.state.showChangeTitleForm}
                            selectBlock={this.handleSelectBlock}
                            deleteBlock={this.handleDeleteBlock}
                            toggleChangeTitleForm={this.handleToggleChangeTitleForm}
                        />
                    )
                }
                <AddTodoBlockButton />
                <button
                    className="fetch-data-button"
                    onClick={getUrgentTodos}
                >
                    Fetch Data
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    blocks: blocksSelector(state),
    currentBlockId: currentTodoBlockIdSelector(state)
})

const mapDispatchToProps = dispatch => ({
    deleteTodoBlock: (id) => dispatch(deleteTodoBlockFromStorage(id)),
    selectTodoBlock: (id) => dispatch(setCurrentTodoBlock(id)),
    getUrgentTodos: () => dispatch(fetchUrgentTodos())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoBlockContainer)