declare namespace account {
  interface accDetailsData {
    id: number;
    name: string;
    preferredName: string;
    email: string;
    countryCode: number;
    phoneNumber: number;
    gender: "M" | "F";
    dob: string;
  }

  interface updateAccDetailsFormData extends updateAccDetailsPayload {
    gender: stringOptionsData;
  }

  interface updateAccDetailsPayload {
    name: string;
    preferredName?: string;
    dob: string;
    gender: string;
    countryCode: number;
    phoneNumber: number;
  }
}
