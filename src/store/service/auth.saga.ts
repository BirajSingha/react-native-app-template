import {API} from '@app/utils/constants';
import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  forgotPasswordFailure,
  forgotPasswordOtpVerifyFailure,
  forgotPasswordOtpVerifySuccess,
  forgotPasswordSuccess,
  getAuthState,
  resendSignupOtpFailure,
  resendSignupOtpSuccess,
  reset,
  resetPasswordFailure,
  resetPasswordSuccess,
  setLoading,
  setToken,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signupOtpVerifyFailure,
  signupOtpVerifySuccess,
  signUpSuccess,
} from '../slice/auth.slice';
import {instance} from '@app/utils/server/instance';
import {showMessage} from '@app/utils/helpers/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfoRequest} from '../slice/user.slice';
import {navigate} from '@app/navigation/RootNaivgation';

const {auth} = API;
const AUTH_KEY = '@feedwell';
const LOGIN_CRED = '@login_cred';

// Worker Saga: Handles the auth-state API call
function* handleGetAuthState(): Generator<any, void, any> {
  try {
    let authStoredValue: string | null = yield call(
      AsyncStorage.getItem,
      AUTH_KEY,
    );
    if (authStoredValue) {
      let {
        data: {accessToken, refreshToken},
      }: any = JSON.parse(authStoredValue);
      yield put(
        setToken({
          accessToken,
          refreshToken,
        }),
      );
      yield put(getUserInfoRequest({}));
    } else {
      yield put(setLoading({loading: false}));
    }
  } catch (error) {
    yield put(setLoading({loading: false}));
  }
}

// Worker Saga: Handles the sign-in API call
function* handleSignIn(action: any): Generator<any, void, any> {
  try {
    const {email, password, check} = action.payload;

    const result: AxiosResponse<any> = yield call(instance.post, auth.login, {
      email,
      password,
    });

    const {status, data} = result;
    if (status === 200) {
      const accessToken = data.data?.accessToken;
      const refreshToken = data.data?.refreshToken;

      yield put(signInSuccess(data));
      yield call(
        AsyncStorage.setItem,
        AUTH_KEY,
        JSON.stringify({accessToken, refreshToken}),
      );
      yield put(
        setToken({
          accessToken,
          refreshToken,
        }),
      );
      if (check == true) {
        yield call(
          AsyncStorage.setItem,
          LOGIN_CRED,
          JSON.stringify({
            email: email ?? '',
            password: password ?? '',
            remember: check ?? false,
          }),
        );
      } else {
        yield call(AsyncStorage.removeItem, LOGIN_CRED);
      }
      yield put(getUserInfoRequest({}));

      showMessage('Login Successful, You have been logged in successfully!');
    }
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 401) {
      yield put(signInFailure(error?.response?.data));
      navigate('VerifyPhone');
      showMessage('Not verified! Please verify your phone number to signin.');
      return;
    }
    showMessage(error?.response?.data?.message || error.message);
    yield put(signInFailure(error?.response?.data));
  }
}

// Worker Saga: Handles the sign-up API call
function* handleSignUp(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.signup,
      action.payload,
    );

    const {status, data} = result;

    if (status === 201) {
      yield put(signUpSuccess(data));
      showMessage(
        'Registration Successful, Your account has been created successfully!',
      );
    } else {
      yield put(signUpFailure(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(signUpFailure(error?.response));
  }
}

// Worker Saga: Handles the sign-up otp verify API call
function* handleSignupOtpVerify(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.signupOtpVerify,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(signupOtpVerifySuccess(data));
      showMessage(
        'OTP Verification Successful. Your account has been verified successfully!',
      );
    } else {
      yield put(signupOtpVerifyFailure(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(signupOtpVerifyFailure(error?.response));
  }
}

// Worker Saga: Handles the sign-up otp verify API call
function* handleResendSignupOtp(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.resendSignupOtp,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(resendSignupOtpSuccess(data));
      showMessage('OTP sent successfully to your mobile number.');
    } else {
      yield put(resendSignupOtpFailure(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(resendSignupOtpFailure(error?.response));
  }
}

// Worker Saga: Handles the forgot password API call
function* handleForgotPassword(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.forgotPassowrd,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(forgotPasswordSuccess(data));
      showMessage('OTP sent successfully to your mobile number.');
    } else {
      yield put(forgotPasswordFailure(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(forgotPasswordFailure(error?.response));
  }
}

// Worker Saga: Handles the forgot password otp verify API call
function* handleVerifyForgotPassword(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.forgotPassowrdOtpVerify,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(forgotPasswordOtpVerifySuccess(data));
      showMessage('OTP Verification Successful.');
    } else {
      yield put(forgotPasswordOtpVerifyFailure(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(forgotPasswordOtpVerifyFailure(error?.response));
  }
}

// Worker Saga: Handles the forgot password API call
function* handleResetPassword(action: any): Generator<any, void, any> {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.resetPassword,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(resetPasswordSuccess(data));
      showMessage('Password reset successful.');
    } else {
      yield put(resetPasswordFailure(data));
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(resetPasswordFailure(error?.response));
  }
}

// Worker Saga: Handles the logout process
function* handleLogout() {
  try {
    yield call(AsyncStorage.removeItem, AUTH_KEY);
    yield put(reset());
    yield put(getAuthState({}));
    showMessage('Logged out successfully.');
  } catch (error) {}
}

function* authSaga(): Generator<any, void, any> {
  yield takeLatest('auth/getAuthState', handleGetAuthState);
  yield takeLatest('auth/signInRequest', handleSignIn);
  yield takeLatest('auth/signUpRequest', handleSignUp);
  yield takeLatest('auth/resendSignupOtpRequest', handleResendSignupOtp);
  yield takeLatest('auth/signupOtpVerifyRequest', handleSignupOtpVerify);
  yield takeLatest('auth/forgotPasswordRequest', handleForgotPassword);
  yield takeLatest(
    'auth/forgotPasswordOtpVerifyRequest',
    handleVerifyForgotPassword,
  );
  yield takeLatest('auth/resetPasswordRequest', handleResetPassword);
  yield takeLatest('auth/logoutRequest', handleLogout);
}

export default authSaga;
