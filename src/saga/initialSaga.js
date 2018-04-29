import { call, put, all } from 'redux-saga/effects'
import {addTodoBlock, setCurrentTodoBlock} from "../actions/todoBlocks";
import { addTodo } from "../actions/todos";
import { readFromStorage, writeToStorage } from "../localStorage";

export function* initialSagaWorker() {
    const [
        mostRecentTodoBlockId,
        mostRecentTodoId,
        closedTodoBlocks,
        closedTodoBlocksIds,
        todoBlocks,
        currentTodoBlockId,
        todos
    ] = yield all([
        call(readFromStorage, "mostRecentTodoBlockId"),
        call(readFromStorage, "mostRecentTodoId"),
        call(readFromStorage, "closedTodoBlocks"),
        call(readFromStorage, "closedTodoBlocksIds"),
        call(readFromStorage, "todoBlocks"),
        call(readFromStorage, "currentTodoBlockId"),
        call(readFromStorage, "todos"),
    ])

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

    if (!currentTodoBlockId) {
        yield call(writeToStorage,"currentTodoBlockId", 0)
    } else {
        yield put(setCurrentTodoBlock(`${currentTodoBlockId}`))
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