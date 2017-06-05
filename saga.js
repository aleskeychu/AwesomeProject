import { put, takeEvery } from 'redux-saga/effects'
import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
import getPeople from './api'

function* fetchData(action) {
  console.log("FETCH DATA SAGA GENERETATOR BEGIN")
  try {
    const data = yield getPeople(action.query)
    if (data == null || data.length == 1) {
      console.log("CUSTOM THROWING, DATA: " + data)
      throw "Empty answer"
    }
    yield put({ type: FETCHING_DATA_SUCCESS, data })
  } catch (e) {
    yield put({ type: FETCHING_DATA_FAILURE })
  }
}

function* dataSaga() {
  yield takeEvery(FETCHING_DATA, fetchData)
}

export default dataSaga
