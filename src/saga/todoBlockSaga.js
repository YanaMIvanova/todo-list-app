import { takeEvery, takeLatest, call, put, all, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { actionTypes, visibilityFilters } from "../constants";
import { addTodoBlock, removeTodoBlock, setClosedTodoBlocks } from "../actions/todoBlocks";
import { readFromStorage, writeToStorage } from "../localStorage";
import { todoBlockSelector } from "../reducers";
const { SHOW_ALL } = visibilityFilters

export const defaultTodoBlock = {
    id: "",
    visibilityFilter: SHOW_ALL,
    title: "New List"
}

// Workers

export function* closeTodoBlockWorker({ blockId }) {
    const closedTodoBlocks = yield call(readFromStorage, "closedTodoBlocks")
    const closedTodoBlocksIds = yield call(readFromStorage, "closedTodoBlocksIds")

    const todoBlockToClose = yield select(todoBlockSelector, blockId)
    yield put(removeTodoBlock(blockId))

    if(!closedTodoBlocksIds.includes(blockId)) {
        yield call(writeToStorage, "closedTodoBlocks", [...closedTodoBlocks, todoBlockToClose])
        yield call(writeToStorage, "closedTodoBlocksIds", [...closedTodoBlocksIds, blockId])
    }
    else {
        for (let i = 0; i <= closedTodoBlocks.length; i++) {
            let currentClosedTodoBlock = closedTodoBlocks[i]
            if (currentClosedTodoBlock.id === blockId) {
                currentClosedTodoBlock.title = todoBlockToClose.title
                break
            }
        }
        yield call(writeToStorage, "closedTodoBlocks", [...closedTodoBlocks])
    }

    yield call(fetchClosedTodoBlocksWorker)
}

export function* fetchClosedTodoBlocksWorker() {
    const closedTodoBlocks = yield call(readFromStorage, "closedTodoBlocks")

    if (closedTodoBlocks != null) {
        yield put(setClosedTodoBlocks(closedTodoBlocks))
    }
}

export function* saveTodoBlockWorker() {
    const mostRecentTodoBlockId = yield call(readFromStorage, "mostRecentTodoBlockId")

    const newTodoBlock = {
        ...defaultTodoBlock,
        id: `${mostRecentTodoBlockId + 1}`
    }

    yield put(addTodoBlock(newTodoBlock))

    yield call(writeToStorage, "mostRecentTodoBlockId", mostRecentTodoBlockId + 1)

    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    yield call(writeToStorage, "todoBlocks", [newTodoBlock, ...todoBlocksFromStorage])

    yield call(writeToStorage, "currentTodoBlockId", `${mostRecentTodoBlockId}`)
}

export function* deleteTodoBlockWorker({ blockId }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")
    const todosFromStorage = yield call(readFromStorage, "todos")
    const closedTodoBlocksFromStorage = yield call(readFromStorage, "closedTodoBlocks")
    const closedTodoBlocksIdsFromStorage = yield call(readFromStorage, "closedTodoBlocksIds")

    let filteredTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id !== blockId) {
            filteredTodoBlocks.push(block)
        }
    }

    let filteredTodos = []

    for (let todo of todosFromStorage) {
        if (todo.blockId !== blockId) {
            filteredTodos.push(todo)
        }
    }

    if (closedTodoBlocksIdsFromStorage.includes(blockId)) {
        let filteredClosedTodoBlocks = []

        for (let closedBlock of closedTodoBlocksFromStorage) {
            if (closedBlock.id !== blockId) {
                filteredClosedTodoBlocks.push(closedBlock)
            }
        }

        let filteredClosedTodoBlocksIds = []

        for (let closedBlockId of closedTodoBlocksIdsFromStorage) {
            if (closedBlockId !== blockId) {
                filteredClosedTodoBlocksIds.push(closedBlockId)
            }
        }

        yield call(writeToStorage, "closedTodoBlocks", filteredClosedTodoBlocks)
        yield call(writeToStorage, "closedTodoBlocksIds", filteredClosedTodoBlocksIds)
        yield call(fetchClosedTodoBlocksWorker)
    }

    yield call(writeToStorage, "todoBlocks", filteredTodoBlocks)
    yield call(writeToStorage, "todos", filteredTodos)
}

export function* setVisibilityFilterWorker({ filter, blockId }) {
    yield call(delay, 1000)

    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    let editedTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id === blockId) {
            block.visibilityFilter = filter
        }
        editedTodoBlocks.push(block)
    }

    yield call(writeToStorage, "todoBlocks", editedTodoBlocks)
}

export function* setCurrentTodoBlockIdWorker({ blockId }) {
    yield call(writeToStorage, "currentTodoBlockId", `${blockId}`)
}

// Watchers

export function* closeTodoBlockWatcher() {
    yield takeEvery(actionTypes.CLOSE_TODO_BLOCK, closeTodoBlockWorker)
}

export function* fetchTodoBlocksWatcher() {
    yield takeEvery(actionTypes.FETCH_CLOSED_TODO_BLOCKS, fetchClosedTodoBlocksWorker)
}

export function* saveTodoBlockWatcher() {
    yield takeEvery(actionTypes.SAVE_TODO_BLOCK_TO_STORAGE, saveTodoBlockWorker)
}

export function* deleteTodoBlockWatcher() {
    yield takeEvery(actionTypes.DELETE_TODO_BLOCK, deleteTodoBlockWorker)
}

export function* setCurrentTodoBlockIdWatcher() {
    yield takeEvery(actionTypes.SET_CURRENT_TODO_BLOCK, setCurrentTodoBlockIdWorker)
}

export function* setVisibilityFilterWatcher() {
    yield takeLatest(actionTypes.SET_VISIBILITY_FILTER, setVisibilityFilterWorker)
}

export default function* todoBlockSaga () {
    yield all([
        closeTodoBlockWatcher(),
        setCurrentTodoBlockIdWatcher(),
        fetchTodoBlocksWatcher(),
        saveTodoBlockWatcher(),
        deleteTodoBlockWatcher(),
        setVisibilityFilterWatcher()
    ])
}