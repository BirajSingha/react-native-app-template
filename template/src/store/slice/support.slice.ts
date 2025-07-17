import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SupportState {
  error: string | null;
  status: string;
  faqList: any;
  faqTypeList: any;
  subscriptionPlans: any;
  submitIssue: any;
}

const initialState: SupportState = {
  status: '',
  error: null,
  faqList: {},
  faqTypeList: {},
  subscriptionPlans: {},
  submitIssue: {},
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    // Fetch FAQ List
    getFAQListRequest(state, action) {
      state.status = action.type;
    },
    getFAQListSuccess(state, action: PayloadAction<any | null>) {
      state.status = action.type;
      state.faqList = action.payload;
    },
    getFAQListFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Fetch FAQ-Type List
    getFAQTypeListRequest(state, action) {
      state.status = action.type;
    },
    getFAQTypeListSuccess(state, action: PayloadAction<any | null>) {
      state.status = action.type;
      state.faqTypeList = action.payload;
    },
    getFAQTypeListFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Submit Issue
    submitIssueRequest(state, action) {
      state.status = action.type;
    },
    submitIssueSuccess(state, action: PayloadAction<any | null>) {
      state.status = action.type;
      state.submitIssue = action.payload;
    },
    submitIssueFailure(state, action: PayloadAction<string>) {
      state.status = action.type;
      state.error = action.payload;
    },

    // Subscription Plans
    getSubscriptionPlansRequest(state, action) {
      state.status = action.type;
    },
    getSubscriptionPlansSuccess(state, action: PayloadAction<any | null>) {
      state.status = action.type;
      state.subscriptionPlans = action.payload;
    },
    getSubscriptionPlansFailure(state, action: PayloadAction<string>) {
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
  // FAQ List
  getFAQListRequest,
  getFAQListSuccess,
  getFAQListFailure,

  // FAQ-Type List
  getFAQTypeListRequest,
  getFAQTypeListSuccess,
  getFAQTypeListFailure,

  // Submit Issue
  submitIssueRequest,
  submitIssueSuccess,
  submitIssueFailure,

  // Subscription Plans
  getSubscriptionPlansRequest,
  getSubscriptionPlansSuccess,
  getSubscriptionPlansFailure,

  // clear & reset status
  clearStatus,
  reset,
} = supportSlice.actions;

export default supportSlice.reducer;
