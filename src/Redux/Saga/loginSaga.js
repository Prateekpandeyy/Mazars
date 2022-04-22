import { call, put, select, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import api from "../../component/api";
import { setLoginDetails, setOtpBoxOpen } from "../actions/action";
import { ActionTypes } from "../constants/actionTypes";

const userDataRequest = function* userDataRequest({ payload }) {
  console.log("saga called");
  try {
    const { data, status } = yield call(api.getUserDetailsOnLogin, payload);
    yield put(setLoginDetails(data[0]));
    if (status === 200) {
      let phoneno = data[0].Mobile;
      let datamobile = {
        phoneno: "91" + phoneno,
      };
      const val = yield call(api.sendOtp, datamobile);
      if (val?.data?.type === "success") {
        yield put(setOtpBoxOpen(true));
      }
    } else {
      Swal.fire({
        title: "error",
        html: "Incorrect user id",
        icon: "error",
      });
    }
  } catch (err) {}
};

export default function* sagas() {
  yield takeLatest(ActionTypes.FETCH_USER_DETAILS, userDataRequest);
}
