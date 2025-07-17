import {
  RESET_PASSWORD_TYPE,
  SIGN_IN_TYPE,
  SIGN_UP_OTP_RESEND_TYPE,
  SIGN_UP_OTP_VERIFY_TYPE,
  SIGN_UP_TYPE,
} from '@app/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  status: string;
  token: string;
  refreshToken: string;
  loading: boolean;
  error: string | null;
  signupResponse?: any;
  signupOtpVerifyResponse?: any;
  resendSignupOtpResponse?: any;
  loginResponse?: any;
  forgotPasswordResponse?: any;
  forgotPasswordOtpVerifyResponse?: any;
  resetPasswordResponse?: any;
}

const initialState: AuthState = {
  status: '',
  refreshToken: '',
  token: '',
  loading: true,
  error: null,
  signupResponse: {},
  signupOtpVerifyResponse: {},
  resendSignupOtpResponse: {},
  loginResponse: {},
  forgotPasswordResponse: {},
  forgotPasswordOtpVerifyResponse: {},
  resetPasswordResponse: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Get Auth State
    getAuthState(state, action) {
      state.status = action.type;
    },

    // Set Token
    setToken(
      state,
      action: PayloadAction<{accessToken: string; refreshToken: string}>,
    ) {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },

    // Set Loading
    setLoading(state, action: PayloadAction<{loading: boolean}>) {
      state.status = action.type;
      state.loading = action.payload.loading;
    },

    // Sign-in
    signInRequest(state, action: PayloadAction<SIGN_IN_TYPE>) {
      state.status = action.type;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.status = action.type;
      state.loginResponse = action.payload;
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Sign-up
    signUpRequest(state, action: PayloadAction<SIGN_UP_TYPE>) {
      state.status = action.type;
    },
    signUpSuccess(state, action) {
      state.status = action.type;
      state.signupResponse = action.payload;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Sign-up OTP Resend
    resendSignupOtpRequest(
      state,
      action: PayloadAction<SIGN_UP_OTP_RESEND_TYPE>,
    ) {
      state.status = action.type;
    },
    resendSignupOtpSuccess(state, action) {
      state.status = action.type;
      state.resendSignupOtpResponse = action.payload;
    },
    resendSignupOtpFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Forgot Password
    forgotPasswordRequest(
      state,
      action: PayloadAction<SIGN_UP_OTP_RESEND_TYPE>,
    ) {
      state.status = action.type;
    },
    forgotPasswordSuccess(state, action) {
      state.status = action.type;
      state.forgotPasswordResponse = action.payload;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Sign-up OTP Verify
    signupOtpVerifyRequest(
      state,
      action: PayloadAction<SIGN_UP_OTP_VERIFY_TYPE>,
    ) {
      state.status = action.type;
    },
    signupOtpVerifySuccess(state, action) {
      state.status = action.type;
      state.signupOtpVerifyResponse = action.payload;
    },
    signupOtpVerifyFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Sign-up OTP Verify
    forgotPasswordOtpVerifyRequest(
      state,
      action: PayloadAction<SIGN_UP_OTP_VERIFY_TYPE>,
    ) {
      state.status = action.type;
    },
    forgotPasswordOtpVerifySuccess(state, action) {
      state.status = action.type;
      state.forgotPasswordOtpVerifyResponse = action.payload;
    },
    forgotPasswordOtpVerifyFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Reset password
    resetPasswordRequest(state, action: PayloadAction<RESET_PASSWORD_TYPE>) {
      state.status = action.type;
    },
    resetPasswordSuccess(state, action) {
      state.status = action.type;
      state.resetPasswordResponse = action.payload;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Logout
    logoutRequest(state, action) {
      state.status = action.type;
    },

    // Clear status & reset
    clearStatus(state, action) {
      state.status = action.type;
    },
    reset: () => initialState,
  },
});

export const {
  // Get Auth State
  getAuthState,
  setLoading,

  // set token
  setToken,

  // Sign-in
  signInRequest,
  signInSuccess,
  signInFailure,

  // Sign-up
  signUpRequest,
  signUpSuccess,
  signUpFailure,

  // Sign-up otp verify
  signupOtpVerifyRequest,
  signupOtpVerifySuccess,
  signupOtpVerifyFailure,

  // Sign-up otp resend
  resendSignupOtpRequest,
  resendSignupOtpSuccess,
  resendSignupOtpFailure,

  // Forgot password
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  // Forgot password otp verify
  forgotPasswordOtpVerifyRequest,
  forgotPasswordOtpVerifySuccess,
  forgotPasswordOtpVerifyFailure,

  // Reset password
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,

  //logout
  logoutRequest,
  clearStatus,
  reset,
} = authSlice.actions;

export default authSlice.reducer;
