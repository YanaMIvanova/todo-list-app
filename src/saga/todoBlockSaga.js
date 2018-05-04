import { actionChannel, takeEvery, takeLatest, call, take, put, all, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { actionTypes, visibilityFilters } from "../constants";
import { addTodoBlock, removeTodoBlock, setClosedTodoBlocks } from "../actions/todoBlocks";
import { readFromStorage, writeToStorage } from "../localStorage";
import { todoBlockSelector } from "../reducers";
const { SHOW_ALL } = visibilityFilters

export const defaultTodoBlock = {
    id: "",
    visibilityFilter: SHOW_ALL,
    title: "New List",
    isClosed: false
}

// Workers

export function* closeTodoBlockWorker({ blockId }) {
    const closedTodoBlocks = yield call(readFromStorage, "closedTodoBlocks")
    const closedTodoBlocksIds = yield call(readFromStorage, "closedTodoBlocksIds")
    const todoBlocks = yield call(readFromStorage, "todoBlocks")

    let filteredTodoBlocks = []

    for (let closedBlock of todoBlocks) {
        if (closedBlock.id !== blockId) {
            filteredTodoBlocks.push(closedBlock)
        }
    }

    yield call(writeToStorage, "todoBlocks", [...filteredTodoBlocks])

    const todoBlockToClose = yield select(todoBlockSelector, blockId)
    todoBlockToClose.isClosed = true

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
                currentClosedTodoBlock.isClosed = todoBlockToClose.isClosed
                currentClosedTodoBlock.visibilityFilter = todoBlockToClose.visibilityFilter
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

    yield call(writeToStorage, "todoBlocks", [...todoBlocksFromStorage, newTodoBlock])

    yield call(writeToStorage, "currentTodoBlockId", `${mostRecentTodoBlockId + 1}`)
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

export function* openTodoBlockWorker({ block }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")
    const closedTodoBlocksFromStorage = yield call(readFromStorage, "closedTodoBlocks")

    let closedTodoBlocks = []

    for (let closedBlock of closedTodoBlocksFromStorage) {
        closedBlock.id === block.id
            ? closedTodoBlocks.push({...closedBlock, isClosed: false})
            : closedTodoBlocks.push({...closedBlock})
    }

    yield call(writeToStorage, "todoBlocks", [...todoBlocksFromStorage, {...block, isClosed: false}])
    yield call(writeToStorage, "closedTodoBlocks", closedTodoBlocks)
    yield put(addTodoBlock(block))
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

export function* setTodoBlockTitleWorker({ title, blockId }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    let editedTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id === blockId) {
            block.title = title
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
    yield takeLatest(actionTypes.CLOSE_TODO_BLOCK, closeTodoBlockWorker)
}

export function* fetchTodoBlocksWatcher() {
    yield takeLatest(actionTypes.FETCH_CLOSED_TODO_BLOCKS, fetchClosedTodoBlocksWorker)
}

export function* saveTodoBlockWatcher() {
    const saveTodoBlockChan = yield actionChannel(actionTypes.SAVE_TODO_BLOCK_TO_STORAGE)

    while (true) {
        yield take(saveTodoBlockChan)

        yield call(saveTodoBlockWorker)
    }
}

export function* deleteTodoBlockWatcher() {
    yield takeLatest(actionTypes.DELETE_TODO_BLOCK, deleteTodoBlockWorker)
}

export function* setCurrentTodoBlockIdWatcher() {
    yield takeEvery(actionTypes.SET_CURRENT_TODO_BLOCK, setCurrentTodoBlockIdWorker)
}

export function* setVisibilityFilterWatcher() {
    yield takeLatest(actionTypes.SET_VISIBILITY_FILTER, setVisibilityFilterWorker)
}

export function* setTodoBlockTitleWatcher() {
    yield takeLatest(actionTypes.SET_TODO_BLOCK_TITLE, setTodoBlockTitleWorker)
}

export function* openTodoBlockWatcher() {
    yield takeLatest(actionTypes.OPEN_TODO_BLOCK, openTodoBlockWorker)
}

export default function* todoBlockSaga () {
    yield all([
        closeTodoBlockWatcher(),
        openTodoBlockWatcher(),
        setTodoBlockTitleWatcher(),
        setCurrentTodoBlockIdWatcher(),
        fetchTodoBlocksWatcher(),
        saveTodoBlockWatcher(),
        deleteTodoBlockWatcher(),
        setVisibilityFilterWatcher()
    ])
}