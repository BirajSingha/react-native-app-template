import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  changePasswordFailure,
  changePasswordSuccess,
  clearStatus,
  deleteAccountFailure,
  deleteAccountSuccess,
  deliveryInfoListFailure,
  deliveryInfoListSuccess,
  getUserInfoFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  guidingFeedListFailure,
  guidingFeedListSuccess,
  guidingFeedResultFailure,
  guidingFeedResultSuccess,
  medicalConditionListFailure,
  medicalConditionListSuccess,
  onboardingDetailsFailure,
  onboardingDetailsRequest,
  onboardingDetailsSuccess,
  trackingFeedAddFailure,
  trackingFeedAddSuccess,
  trackingFeedListFailure,
  trackingFeedListSuccess,
  updateOnboardingFailure,
  updateOnboardingSuccess,
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

const {user, trackingFeed, guidingFeed} = API;

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

function* handleOnboardingInfo() {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.get,
      user.onboardingDetails,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(onboardingDetailsSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(onboardingDetailsFailure(error?.response));
  }
}

function* handleUpdateOnboardingInfo(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.patch,
      user.updateOnboardingDetails,
      createFrom(action.payload),
      _header,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(updateOnboardingSuccess(data));
      yield put(onboardingDetailsRequest());
      yield put(clearStatus({}));
      showMessage(data?.message);
      goBack();
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(updateOnboardingFailure(error?.response));
  }
}

function* handleMedicalConditionInfo() {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.get,
      user.medicalConditionInfo,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(medicalConditionListSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(medicalConditionListFailure(error?.response));
  }
}

function* handleDeliveryInfo() {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.get,
      user.deliveryInfo,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(deliveryInfoListSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(deliveryInfoListFailure(error?.response));
  }
}

function* handleTrackingFeedAdd(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      trackingFeed.trackingFeedAdd,
      action.payload,
    );

    const {status, data} = result;

    if (status === 201) {
      yield put(trackingFeedAddSuccess(data));
      showMessage(data?.message);
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(trackingFeedAddFailure(error?.response));
  }
}

function* handleTrackingFeedList(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      trackingFeed.trackingFeedList,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(trackingFeedListSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(trackingFeedListFailure(error?.response));
  }
}

function* handleGuidingFeedList(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      guidingFeed.guidingFeedList,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(guidingFeedListSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(guidingFeedListFailure(error?.response));
  }
}

function* handleGuidingFeedRes(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      guidingFeed.guidingFeedRes,
      action.payload,
    );

    const {status, data} = result;

    if (status === 201) {
      yield put(guidingFeedResultSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(guidingFeedResultFailure(error?.response));
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
  yield takeLatest('user/onboardingDetailsRequest', handleOnboardingInfo);
  yield takeLatest('user/updateOnboardingRequest', handleUpdateOnboardingInfo);
  yield takeLatest(
    'user/medicalConditionListRequest',
    handleMedicalConditionInfo,
  );
  yield takeLatest('user/deliveryInfoListRequest', handleDeliveryInfo);
  yield takeLatest('user/trackingFeedAddRequest', handleTrackingFeedAdd);
  yield takeLatest('user/trackingFeedListRequest', handleTrackingFeedList);
  yield takeLatest('user/guidingFeedListRequest', handleGuidingFeedList);
  yield takeLatest('user/guidingFeedResultRequest', handleGuidingFeedRes);
  yield takeLatest('user/deleteAcoountRequest', handleDeleteUser);
}

export default userSaga;
