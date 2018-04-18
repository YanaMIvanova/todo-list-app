import { takeEvery, all, call, put } from 'redux-saga/effects'
import { actionTypes, visibilityFilters } from "../constants";
import {addTodoBlock, deleteTodoBlock, setTodoBlockTitle} from "../actions/todoBlocks";
import { readFromStorage, writeToStorage } from "../localStorage";
const { SHOW_ALL } = visibilityFilters

export const defaultTodoBlock = {
    id: 0,
    visibilityFilter: SHOW_ALL,
    title: "New List"
}

export function* initialSaga() {
    const mostRecentId = yield call(readFromStorage, "mostRecentId")
    const todoBlocks = yield call(readFromStorage, "todoBlocks")
    if (!mostRecentId) {
        yield call(writeToStorage,"mostRecentId", 0)
    }
    if (!todoBlocks) {
        yield call(writeToStorage,"todoBlocks", [])
    } else {
        for (let block of todoBlocks) {
            yield put(addTodoBlock(block))
        }
    }
}

export function* saveTodoBlockToStorageWorker() {
    const mostRecentId = yield call(readFromStorage, "mostRecentId")

    const newTodoBlock = {
        ...defaultTodoBlock,
        id: mostRecentId + 1
    }

    yield put(addTodoBlock(newTodoBlock))

    yield call(writeToStorage, "mostRecentId", mostRecentId + 1)

    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    yield call(writeToStorage, "todoBlocks", [...todoBlocksFromStorage, newTodoBlock])
}

export function* deleteTodoBlockFromStorageWorker({ id }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")
    let filteredTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id !== id) {
            filteredTodoBlocks.push(block)
        }
    }

    yield put(deleteTodoBlock(id))

    yield call(writeToStorage, "todoBlocks", filteredTodoBlocks)
}

export function* setTodoBlockTitleToStorageWorker({ title, id }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    let editedTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id === id) {
            block.title = title
        }
        editedTodoBlocks.push(block)
    }

    yield put(setTodoBlockTitle(title, id))

    yield call(writeToStorage, "todoBlocks", editedTodoBlocks)
}

export function* saveTodoBlockToStorageWatcher() {
    yield takeEvery(actionTypes.SAVE_TODO_BLOCK_TO_STORAGE, saveTodoBlockToStorageWorker)
}

export function* deleteTodoBlockFromStorageWatcher() {
    yield takeEvery(actionTypes.DELETE_TODO_BLOCK_FROM_STORAGE, deleteTodoBlockFromStorageWorker)
}

export function* setTodoBlockTitleToStorageWatcher() {
    yield takeEvery(actionTypes.SET_TODO_BLOCK_TITLE_TO_STORAGE, setTodoBlockTitleToStorageWorker)
}

export default function* rootSaga () {
    yield all([
        setTodoBlockTitleToStorageWatcher(),
        deleteTodoBlockFromStorageWatcher(),
        saveTodoBlockToStorageWatcher(),
        initialSaga(),
    ])
}