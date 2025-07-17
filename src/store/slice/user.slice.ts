import {
  ADDITIONAL_INFO_TYPE,
  CHANGE_PASSWORD_TYPE,
  DELETE_ACCOUNT_TYPE,
  GUIDING_MODE_RES_TYPES,
  TRACKING_FEED_LIST,
  UPDATE_USER_INFORMATION,
} from '@app/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  error: string | null;
  status: string;
  userInfo: any;
  updateUserInfoResponse: any;
  changePasswordResponse: any;
  deleteUserResponse: any;
  onboardingDetails: any;
  updateOnboardingResponse: any;
  medicalConditionList: any;
  deliveryInfoList: any;
  trackingFeedAdd: any;
  trackingFeedList: any;
  guidingFeedRes: any;
  guidingFeedList: any;
}

const initialState: UserState = {
  status: '',
  error: null,
  userInfo: {},
  updateUserInfoResponse: {},
  changePasswordResponse: {},
  deleteUserResponse: {},
  onboardingDetails: {},
  updateOnboardingResponse: {},
  medicalConditionList: {},
  deliveryInfoList: {},
  trackingFeedAdd: {},
  trackingFeedList: {},
  guidingFeedRes: {},
  guidingFeedList: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // fetch user information
    getUserInfoRequest(state, action) {
      state.status = action.type;
    },
    getUserInfoSuccess(state, action: PayloadAction<any | null>) {
      state.status = action.type;
      state.userInfo = action.payload;
    },
    getUserInfoFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // update user information
    updateUserInfoRequest(
      state,
      action: PayloadAction<UPDATE_USER_INFORMATION>,
    ) {
      state.status = action.type;
    },
    updateUserInfoSuccess(state, action) {
      state.status = action.type;
      state.updateUserInfoResponse = action.payload;
    },
    updateUserInfoFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Change Password
    changePasswordRequest(state, action: PayloadAction<CHANGE_PASSWORD_TYPE>) {
      state.status = action.type;
    },
    changePasswordSuccess(state, action) {
      state.status = action.type;
      state.changePasswordResponse = action.payload;
    },
    changePasswordFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Onboarding Details
    onboardingDetailsRequest(state, action: PayloadAction) {
      state.status = action.type;
    },
    onboardingDetailsSuccess(state, action) {
      state.status = action.type;
      state.onboardingDetails = action.payload;
    },
    onboardingDetailsFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Update Onboarding Details
    updateOnboardingRequest(
      state,
      action: PayloadAction<ADDITIONAL_INFO_TYPE>,
    ) {
      state.status = action.type;
    },
    updateOnboardingSuccess(state, action) {
      state.status = action.type;
      state.updateOnboardingResponse = action.payload;
    },
    updateOnboardingFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Get Medical Condition List
    medicalConditionListRequest(state, action: PayloadAction) {
      state.status = action.type;
    },
    medicalConditionListSuccess(state, action) {
      state.status = action.type;
      state.medicalConditionList = action.payload;
    },
    medicalConditionListFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Get Delivery Info List
    deliveryInfoListRequest(state, action: PayloadAction) {
      state.status = action.type;
    },
    deliveryInfoListSuccess(state, action) {
      state.status = action.type;
      state.deliveryInfoList = action.payload;
    },
    deliveryInfoListFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Tracking Feed Add
    trackingFeedAddRequest(state, action: PayloadAction) {
      state.status = action.type;
    },
    trackingFeedAddSuccess(state, action) {
      state.status = action.type;
      state.trackingFeedAdd = action.payload;
    },
    trackingFeedAddFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Tracking Feed List
    trackingFeedListRequest(state, action: PayloadAction<TRACKING_FEED_LIST>) {
      state.status = action.type;
    },
    trackingFeedListSuccess(state, action) {
      state.status = action.type;
      state.trackingFeedList = action.payload;
    },
    trackingFeedListFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Guiding Feed Result
    guidingFeedResultRequest(
      state,
      action: PayloadAction<GUIDING_MODE_RES_TYPES>,
    ) {
      state.status = action.type;
    },
    guidingFeedResultSuccess(state, action) {
      state.status = action.type;
      state.guidingFeedRes = action.payload;
    },
    guidingFeedResultFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // guiding Feed List
    guidingFeedListRequest(state, action: PayloadAction) {
      state.status = action.type;
    },
    guidingFeedListSuccess(state, action) {
      state.status = action.type;
      state.guidingFeedList = action.payload;
    },
    guidingFeedListFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Delete account
    deleteAcoountRequest(state, action: PayloadAction<DELETE_ACCOUNT_TYPE>) {
      state.status = action.type;
    },
    deleteAccountSuccess(state, action) {
      state.status = action.type;
      state.deleteUserResponse = action.payload;
    },
    deleteAccountFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Clear status and reset
    clearStatus(state, action) {
      state.status = action.type;
    },
    reset: () => initialState,
  },
});

export const {
  // fetch user information
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,

  // update user information
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,

  // change password
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,

  // onboarding details
  onboardingDetailsRequest,
  onboardingDetailsSuccess,
  onboardingDetailsFailure,

  // update onboarding details
  updateOnboardingRequest,
  updateOnboardingSuccess,
  updateOnboardingFailure,

  // medical condition list
  medicalConditionListRequest,
  medicalConditionListSuccess,
  medicalConditionListFailure,

  // delivery info list
  deliveryInfoListRequest,
  deliveryInfoListSuccess,
  deliveryInfoListFailure,

  // tracking feed add
  trackingFeedAddRequest,
  trackingFeedAddSuccess,
  trackingFeedAddFailure,

  // tracking feed list
  trackingFeedListRequest,
  trackingFeedListSuccess,
  trackingFeedListFailure,

  // guiding feed result
  guidingFeedResultRequest,
  guidingFeedResultSuccess,
  guidingFeedResultFailure,

  // guiding feed list
  guidingFeedListRequest,
  guidingFeedListSuccess,
  guidingFeedListFailure,

  // delete account
  deleteAcoountRequest,
  deleteAccountSuccess,
  deleteAccountFailure,

  // clear & reset status
  clearStatus,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
