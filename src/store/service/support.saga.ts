import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {showMessage} from '@app/utils/helpers/Toast';
import {API} from '@app/utils/constants';
import {instance} from '@app/utils/server/instance';
import {
  clearStatus,
  getFAQListFailure,
  getFAQListSuccess,
  getFAQTypeListFailure,
  getFAQTypeListSuccess,
  getSubscriptionPlansFailure,
  getSubscriptionPlansSuccess,
  submitIssueFailure,
  submitIssueSuccess,
} from '../slice/support.slice';

const {support} = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

function* handleFAQTypeList() {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.get,
      support.faqTypeList,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(getFAQTypeListSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(getFAQTypeListFailure(error?.response));
  }
}

function* handleFAQList(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      support.faqList,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(getFAQListSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(getFAQListFailure(error?.response));
  }
}

function* handleSubmitIssue(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      support.contactUs,
      action.payload,
    );

    const {status, data} = result;

    if (status === 201) {
      yield put(submitIssueSuccess(data));
      showMessage(data?.message);
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(submitIssueFailure(error?.response));
  }
}

function* handleSubscriptionPlans() {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.get,
      support.subscriptionPlans,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(getSubscriptionPlansSuccess(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(getSubscriptionPlansFailure(error?.response));
  }
}

function* supportSaga() {
  yield takeLatest('support/getFAQTypeListRequest', handleFAQTypeList);
  yield takeLatest('support/getFAQListRequest', handleFAQList);
  yield takeLatest('support/submitIssueRequest', handleSubmitIssue);
  yield takeLatest(
    'support/getSubscriptionPlansRequest',
    handleSubscriptionPlans,
  );
}

export default supportSaga;
