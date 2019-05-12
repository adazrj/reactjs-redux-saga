import { call, put, takeEvery, fork, select } from "redux-saga/effects";
import { Actions } from "./action";
import * as Types from "./actionType";
import * as StarApi from "../../apis/Star";
import { getToken } from "../User/selector";

export function* workGet({ payload }) {
  const req = {
    token:yield select(getToken)
  }
  try {
    console.log("saga: ", req);
    const response = yield call(StarApi.getlist, req);//调用异步函数
    console.log(response);
    if (response.data.code === 0) {
      yield put(Actions.getStar_success(response.data.data));//等于dispatch
    } else {
      yield put(Actions.getStar_failure(response.data.message));
    }
  } catch (error) {
    yield put(Actions.failure(error));
  }
}

function* watchGet() {
  console.log("watching GETSTAR_REQUEST");
  yield takeEvery(Types.GETSTAR_REQUEST, workGet);//监听action，每个action都触发一次
}

export default [fork(watchGet)];//非阻塞任务调用机制