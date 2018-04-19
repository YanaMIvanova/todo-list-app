import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeTodoBlock, deleteTodoBlock, setCurrentTodoBlock } from "../actions/todoBlocks"
import { blocksSelector, currentTodoBlockIdSelector } from '../reducers'
import AddTodoBlockButton from '../components/AddTodoBlockButton'
import TodoBlock from '../components/TodoBlock'
import Dashboard from "../components/Dashboard";

class TodoBlockContainer extends Component {
    state = {
        showChangeTitleForm: false
    }

    handleDeleteBlock = id => event => {
        const { deleteTodoBlock } = this.props
        event.stopPropagation()

        deleteTodoBlock(id)
    }

    handleCloseTodoBlock = id => event => {
        const { closeTodoBlock } = this.props
        event.stopPropagation()

        closeTodoBlock(id)
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
                <Dashboard />
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
                            closeTodoBlock={this.handleCloseTodoBlock}
                            toggleChangeTitleForm={this.handleToggleChangeTitleForm}
                        />
                    )
                }
                <AddTodoBlockButton />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    blocks: blocksSelector(state),
    currentBlockId: currentTodoBlockIdSelector(state)
})

const mapDispatchToProps = dispatch => ({
    deleteTodoBlock: (id) => dispatch(deleteTodoBlock(id)),
    closeTodoBlock: (id) => dispatch(closeTodoBlock(id)),
    selectTodoBlock: (id) => dispatch(setCurrentTodoBlock(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoBlockContainer)