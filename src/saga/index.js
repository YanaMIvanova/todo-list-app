import { takeEvery, all, call } from 'redux-saga/effects'
import {loadState, saveState} from "../localStorage";

export function* uploadInitialDataToLocalStore() {
    const mostRecentId = yield call(loadState, "id")
    if (!mostRecentId) {
        yield call(saveState,"id", 1)
    }
}

export function* fetchUrgentTodosWorker() {
    const data = yield call(loadState)
    console.log(data)
}

export function* fetchUrgentTodosWatcher() {
    yield takeEvery('FETCH_URGENT_TODOS', fetchUrgentTodosWorker)
}

export default function* rootSaga () {
    yield all([
        uploadInitialDataToLocalStore(),
        fetchUrgentTodosWatcher()
    ])
}