import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  changePasswordFailure,
  changePasswordSuccess,
  clearStatus,
  deleteAccountFailure,
  deleteAccountSuccess,
  getUserInfoFailure,
  getUserInfoSuccess,
  updateUserInfoFailure,
  updateUserInfoSuccess,
} from '../slice/user.slice';
import {showMessage} from '@app/utils/helpers/Toast';
import {createFrom} from '@app/utils/helpers/Validation';
import {API} from '@app/utils/constants';
import {instance} from '@app/utils/server/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuthState, logoutRequest, reset} from '../slice/auth.slice';
import {goBack} from '@app/navigation/RootNaivgation';

const AUTH_KEY = '@feedwell';

const {user} = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

function* handleUserInfo() {
  try {
    const result: AxiosResponse<any> = yield call(instance.get, user.profile);

    const {status, data} = result;

    if (status === 200) {
      yield put(getUserInfoSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(
      getUserInfoFailure(error?.response?.data?.message || error.message),
    );
  }
}

function* handleUpdateUserInfo(action: any): Generator<any, void, any> {
  try {
    const {id, fullName, profileImage} = action.payload;
    const result: AxiosResponse<any> = yield call(
      instance.patch,
      `${user.editProfile}/${id}`,
      createFrom({
        fullName,
        profileImage,
      }),
      _header,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(updateUserInfoSuccess(data));
      yield put(getUserInfoRequest({}));
      yield put(clearStatus({}));
      showMessage(data?.message);
      goBack();
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(updateUserInfoFailure(error?.response));
    if (error?.response?.data?.message === 'Unauthorized') {
      yield put(logoutRequest({}));
    }
  }
}

function* handleChangePassword(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.patch,
      user.changePassword,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(changePasswordSuccess(data));
      showMessage(data?.message);
    } else {
      yield put(changePasswordFailure(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(changePasswordFailure(error?.response));
  }
}

function* handleDeleteUser(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.delete,
      `${user.deleteAccount}/${action.payload.id}`,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(deleteAccountSuccess(data));
      showMessage(data?.message);
      yield call(AsyncStorage.removeItem, AUTH_KEY);
      yield put(reset());
      yield put(getAuthState({}));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(deleteAccountFailure(error?.response));
  }
}

function* userSaga() {
  yield takeLatest('user/getUserInfoRequest', handleUserInfo);
  yield takeLatest('user/updateUserInfoRequest', handleUpdateUserInfo);
  yield takeLatest('user/changePasswordRequest', handleChangePassword);
  yield takeLatest('user/deleteAcoountRequest', handleDeleteUser);
}

export default userSaga;
