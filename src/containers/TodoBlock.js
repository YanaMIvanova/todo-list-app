import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Filters from '../components/Filters'
import AddTodoBlock from '../components/AddTodoBlock'
import TodoBlockHeader from '../components/TodoBlockHeader'
import { blocksSelector } from '../reducers'
import { removeTodoBlock, selectTodoBlock } from "../actions";

class TodoBlock extends Component {
    handleRemoveBlock = id => {
        const { onClick } = this.props

        onClick(id)
    }

    handleSelectBlock = id => {
        const { selectTodoBlock } = this.props

        selectTodoBlock(id)
    }

    render() {
        const { blocks } = this.props

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexWrap: "wrap"
                }}
            >
                {
                    blocks.map(block => (
                        <div
                            key={"key-" + block.id}
                            style={{
                                border: "1px solid black",
                                padding: "10px",
                                width: "30%",
                                margin: "10px",
                                display: "inline-block"
                            }}
                        >
                            <TodoBlockHeader
                                title={block.title}
                                removeTodoBlock={() => this.handleRemoveBlock(block.id)}
                                selectTodoBlock={() => this.handleSelectBlock(block.id)}
                            />
                            {
                                block.selected && (
                                    <Fragment>
                                        <AddTodo blockId={block.id}/>
                                        <Filters blockId={block.id}/>
                                        <VisibleTodoList blockId={block.id}/>
                                    </Fragment>
                                )
                            }
                        </div>
                    ))
                }
                <AddTodoBlock />
            </div>
        )
    }
}

const mapStateToProps = state => (
     {
        blocks: blocksSelector(state)
     }
)

const mapDispatchToProps = dispatch => {
    return {
        onClick: (id) => dispatch(removeTodoBlock(id)),
        selectTodoBlock: (id) => dispatch(selectTodoBlock(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoBlock)