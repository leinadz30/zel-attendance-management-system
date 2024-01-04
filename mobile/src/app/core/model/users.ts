import { Files } from './files';

export class Users {
  userId: string;
  userCode: string;
  userName: string;
  password: string;
  userType: string;
  dateRegistered: Date;
  dateUpdated: Date;
  active: boolean;
  userProfilePic: UserProfilePic;
}


export class UserProfilePic {
  userId: string;
  file: Files;
  user: Users;
}
