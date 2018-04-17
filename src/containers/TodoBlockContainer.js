import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeTodoBlock, setCurrentTodoBlock } from "../actions/todoBlocks";
import { blocksSelector, currentTodoBlockIdSelector } from '../reducers'
import AddTodoBlockButton from '../components/AddTodoBlockButton'
import TodoBlock from '../components/TodoBlock'

class TodoBlockContainer extends Component {
    state = {
        showChangeTitleForm: false
    }

    handleRemoveBlock = id => event => {
        const { removeTodoBlock } = this.props
        event.stopPropagation()

        removeTodoBlock(id)
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
        const { blocks, currentBlockId } = this.props

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
                            removeBlock={this.handleRemoveBlock}
                            toggleChangeTitleForm={this.handleToggleChangeTitleForm}
                        />
                    )
                }
                <AddTodoBlockButton />
                <button
                    className="fetch-data-button"
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

const mapDispatchToProps = dispatch => {
    return {
        removeTodoBlock: (id) => dispatch(removeTodoBlock(id)),
        selectTodoBlock: (id) => dispatch(setCurrentTodoBlock(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoBlockContainer)