import { all } from 'redux-saga/effects'
import todoBlockSaga from "./todoBlockSaga";
import todoSaga from "./todoSaga";
import { initialSaga }from "./initialSaga";

export default function* rootSaga () {
    yield all([
        initialSaga(),
        todoBlockSaga(),
        todoSaga(),
    ])
}