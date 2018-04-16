import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddTodoBlock from '../components/AddTodoBlock'
import TodoBlock from '../components/TodoBlock'
import { blocksSelector, currentTodoBlockIdSelector } from '../reducers'
import { removeTodoBlock, setCurrentTodoBlock } from "../actions/todoBlocks";

class TodoBlockContainer extends Component {
    state = {
        showChangeTitleForm: false
    }

    handleRemoveBlock = id => event => {
        const { removeTodoBlock } = this.props
        event.stopPropagation()

        removeTodoBlock(id)
    }

    handleSelectBlock = id => event => {
        const { selectTodoBlock } = this.props

        selectTodoBlock(id)
    }

    handleToggleChangeTitleForm = () => {
        this.setState({
            showChangeTitleForm: !this.state.showChangeTitleForm
        })
    }

    render() {
        const { blocks, currentBlockId } = this.props

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexWrap: "wrap"
                }}
            >
                {
                    blocks.map(block =>
                        <TodoBlock
                            key={block.id}
                            block={block}
                            showChangeTitleForm={this.state.showChangeTitleForm}
                            currentBlockId={currentBlockId}
                            selectBlock={this.handleSelectBlock}
                            removeBlock={this.handleRemoveBlock}
                            toggleChangeTitleForm={this.handleToggleChangeTitleForm}
                        />
                    )
                }
                <AddTodoBlock />
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