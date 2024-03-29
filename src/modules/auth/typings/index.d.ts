declare namespace auth {
  interface logInPayload extends logInFormData {
    role: number;
  }

  interface logInFormData {
    email: string;
    password: string;
  }

  interface logInResponse {
    accessToken: string;
    user: submitSignUpPayload;
  }

  interface submitSignUpPayload extends signUpFormData {
    gender: string;
  }

  interface signUpFormData {
    email: string;
    dob: string;
    confirmPassword: string;
    gender: stringOptionsData;
    password: string;
    countryCode: number;
    phoneNumber: number;
    name: string;
    preferredName?: string;
  }

  interface submitForgotPasswordPayload {
    email: string;
  }

  interface resetPasswordPayload {
    token: string;
    password: string;
  }

  interface resetPasswordFormData extends resetPasswordPayload {
    confirmPassword: string;
  }
}
