export const API = {
  auth: {
    login: 'api/auth/login',
    signup: 'api/auth/register',
    refreshToken: 'api/auth/refresh-token',
    signupOtpVerify: 'api/v1/user/verify-signup-otp',
    resendSignupOtp: 'api/v1/user/resend-signup-otp',
    forgotPassowrd: 'api/v1/user/forgot-password',
    forgotPassowrdOtpVerify: 'api/v1/user/verify-forgot-password-otp',
    resetPassword: 'api/v1/user/reset-password',
  },
  user: {
    profile: 'api/v1/user/profile-details',
    editProfile: 'api/v1/user',
    changePassword: 'api/auth/profile-change-password',
    deleteAccount: 'api/v1/user',
  },
};
