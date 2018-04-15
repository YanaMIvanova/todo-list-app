import React, { Fragment } from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Filters from '../components/Filters'
import ChangeTitle from '../containers/ChangeTitle'
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
            display: "flex",
            flexDirection: "column"
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
                    <ChangeTitle
                        blockId={block.id}
                    />
                    <AddTodo blockId={block.id}/>
                    <Filters blockId={block.id}/>
                    <VisibleTodoList blockId={block.id}/>
                </Fragment>
            )
        }
    </div>
)

TodoBlock.propTypes = {
    currentBlockId: PropTypes.string.isRequired,
    block: PropTypes.object.isRequired,
    selectBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired
}


export default TodoBlock