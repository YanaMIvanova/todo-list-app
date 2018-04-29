import { call, put, all } from 'redux-saga/effects'
import { addTodoBlock } from "../actions/todoBlocks";
import { addTodo } from "../actions/todos";
import { readFromStorage, writeToStorage } from "../localStorage";

export function* initialSagaWorker() {
    const mostRecentTodoBlockId = yield call(readFromStorage, "mostRecentTodoBlockId")
    const mostRecentTodoId = yield call(readFromStorage, "mostRecentTodoId")
    const todoBlocks = yield call(readFromStorage, "todoBlocks")
    const closedTodoBlocks = yield call(readFromStorage, "closedTodoBlocks")
    const closedTodoBlocksIds = yield call(readFromStorage, "closedTodoBlocksIds")
    const todos = yield call(readFromStorage, "todos")

    if (!mostRecentTodoBlockId) {
        yield call(writeToStorage,"mostRecentTodoBlockId", 0)
    }

    if (!mostRecentTodoId) {
        yield call(writeToStorage,"mostRecentTodoId", 0)
    }

    if (!todoBlocks) {
        yield call(writeToStorage,"todoBlocks", [])
    } else {
        for (let block of todoBlocks) {
            yield put(addTodoBlock(block))
        }
    }

    if (!closedTodoBlocks) {
        yield call(writeToStorage,"closedTodoBlocks", [])
    }

    if (!closedTodoBlocksIds) {
        yield call(writeToStorage,"closedTodoBlocksIds", [])
    }

    if (!todos) {
        yield call(writeToStorage,"todos", [])
    } else {
        for (let todo of todos) {
            yield put(addTodo(todo))
        }
    }
}

export function* initialSaga () {
    yield all([
        initialSagaWorker(),
    ])
}