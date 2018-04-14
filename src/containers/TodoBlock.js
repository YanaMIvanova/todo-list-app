import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filters from '../components/Filters'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import AddTodoBlock from '../components/AddTodoBlock'
import TodoBlockHeader from '../components/TodoBlockHeader'
import { removeTodoBlock } from "../actions";

class TodoBlock extends Component {
    handleRemoveBlock = id => {
        const { onClick } = this.props

        onClick(id)
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
                            <TodoBlockHeader title={block.title} removeTodoBlock={() => this.handleRemoveBlock(block.id)} />
                            <AddTodo blockId={block.id}/>
                            <Filters blockId={block.id}/>
                            <VisibleTodoList blockId={block.id}/>
                        </div>
                    ))
                }
                <AddTodoBlock />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        blocks: state.todoBlocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: (id) => dispatch(removeTodoBlock(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoBlock)