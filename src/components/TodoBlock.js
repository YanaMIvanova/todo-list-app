import React, { Fragment } from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Filters from '../components/Filters'
import TodoBlockHeader from './TodoBlockHeader'
import PropTypes from "prop-types";

const TodoBlock = ({ currentBlockId, block, selectBlock, removeBlock }) => (
    <div
        key={"key-" + block.id}
        style={{
            border: "1px solid black",
            padding: "10px",
            minWidth: "400px",
            margin: "10px",
            display: "inline-block"
        }}
    >
        <TodoBlockHeader
            title={block.title}
            removeTodoBlock={removeBlock(block.id)}
            selectTodoBlock={selectBlock(block.id)}
        />
        {
            currentBlockId === block.id && (
                <Fragment>
                    <AddTodo blockId={block.id}/>
                    <Filters blockId={block.id}/>
                    <VisibleTodoList blockId={block.id}/>
                </Fragment>
            )
        }
    </div>
)

Filters.propTypes = {
    currentBlockId: PropTypes.string,
    block: PropTypes.object,
    selectBlock: PropTypes.func,
    removeBlock: PropTypes.func
}


export default TodoBlock