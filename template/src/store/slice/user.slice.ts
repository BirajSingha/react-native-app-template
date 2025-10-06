import {
  CHANGE_PASSWORD_TYPE,
  DELETE_ACCOUNT_TYPE,
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
}

const initialState: UserState = {
  status: '',
  error: null,
  userInfo: {},
  updateUserInfoResponse: {},
  changePasswordResponse: {},
  deleteUserResponse: {},
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

  // delete account
  deleteAcoountRequest,
  deleteAccountSuccess,
  deleteAccountFailure,

  // clear & reset status
  clearStatus,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
