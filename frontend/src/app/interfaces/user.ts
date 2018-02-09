export interface User {
  _id?: String;
  username: String;
  email?: String;
  password?: String;
  sms_number?: String | number;
}

export interface UserRegister extends User {
  passwordConf: String;
}

export interface UserLogin extends User {
  remember: boolean;
}

export interface UserUpdate extends User {
  isEmailUpdate: boolean;
}
