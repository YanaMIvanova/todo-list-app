import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { closeTodoBlock, deleteTodoBlock, fetchClosedTodoBlocks, setCurrentTodoBlock } from "../actions/todoBlocks"
import { blocksSelector, closedTodoBlocksSelector, currentTodoBlockIdSelector } from '../reducers'
import TodoBlocks from "../components/TodoBlocks";

class TodoBlocksContainer extends Component {
    state = {
        shouldShowChangeTitleForm: false
    }

    componentDidMount() {
        const { fetchClosedTodoBlocks } = this.props

        fetchClosedTodoBlocks()
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
            shouldShowChangeTitleForm: !this.state.shouldShowChangeTitleForm
        })
    }

    checkIsExpanded = (blockId) => {
        const { currentBlockId } = this.props

        return currentBlockId === blockId
    }

    render() {
        const { blocks, currentBlockId, closedTodoBlocks } = this.props
        const { shouldShowChangeTitleForm } = this.state

        return <TodoBlocks
            closedTodoBlocks={closedTodoBlocks}
            blocks={blocks}
            currentBlockId={currentBlockId}
            checkIsExpanded={this.checkIsExpanded}
            shouldShowChangeTitleForm={shouldShowChangeTitleForm}
            selectBlock={this.handleSelectBlock}
            deleteBlock={this.handleDeleteBlock}
            closeTodoBlock={this.handleCloseTodoBlock}
            toggleChangeTitleForm={this.handleToggleChangeTitleForm}
        />
    }
}

TodoBlocksContainer.propTypes = {
    currentBlockId: PropTypes.string,
    blocks: PropTypes.array.isRequired,
    closedTodoBlocks: PropTypes.array,
    deleteTodoBlock: PropTypes.func.isRequired,
    fetchClosedTodoBlocks: PropTypes.func.isRequired,
    closeTodoBlock: PropTypes.func.isRequired,
    selectTodoBlock: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    blocks: blocksSelector(state),
    currentBlockId: currentTodoBlockIdSelector(state),
    closedTodoBlocks: closedTodoBlocksSelector(state),
})

const mapDispatchToProps = dispatch => ({
    deleteTodoBlock: (id) => dispatch(deleteTodoBlock(id)),
    fetchClosedTodoBlocks: () => dispatch(fetchClosedTodoBlocks()),
    closeTodoBlock: (id) => dispatch(closeTodoBlock(id)),
    selectTodoBlock: (id) => dispatch(setCurrentTodoBlock(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoBlocksContainer)