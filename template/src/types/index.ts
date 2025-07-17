export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  VerifyPhone: undefined;
  OtpVerification: {
    page: string;
    mobile: string;
  };
  ForgotPassword: undefined;
  ChangePassword: {
    mobile: string;
  };
  Home: undefined;
  Settings: undefined;
  Resources: undefined;
  Notifications: undefined;
  Onboarding: undefined;
  AddInsuranceFront: undefined;
  AddInsuranceBack: undefined;
  ChoosePlan: undefined;
  BottomTab: undefined;
  FeedNow: undefined;
  DailyCheckIn: undefined;
  NursePastFeeds: {
    mode: string;
  };
  MyResources: undefined;
  DoctorDetails: undefined;
  BookAppoinment: undefined;
  PayNow: undefined;
  BookingDetails: {
    route: {
      params: {
        tab: string;
      };
    };
  };
  AdditionalInfo: undefined;
  EditAdditionalInfo: undefined;
  EditProfile: undefined;
  MedicalHistory: undefined;
  Insurance: undefined;
  Support: undefined;
  SubmitIssue: undefined;
  SubscriptionPlan: undefined;
  Chat: undefined;
  VideoPlayer: {
    file: string;
  };
};

// -------------------------- API PROPS ----------------------------------
export interface SIGN_UP_TYPE {
  fullName: string;
  email: string;
  phone: string;
  d_o_b: any;
  password: string;
  deviceToken: string;
}

export interface SIGN_UP_OTP_RESEND_TYPE {
  phone: string;
}

export interface SIGN_UP_OTP_VERIFY_TYPE {
  phone: string;
  otp: string;
}

export interface SIGN_IN_TYPE {
  email: string;
  password: string;
  check: boolean;
}

export interface UPDATE_USER_INFORMATION {
  fullName: string;
  profileImage: any;
}

export interface PersonalInfoProps {
  dob: any;
  priorPregnancy: string;
  expectedDueDate: any;
  expectedReturnDate: any;
}

export interface USER_INFO {
  fullname: string;
  dob: string;
  email: string;
  mobile: string;
}
