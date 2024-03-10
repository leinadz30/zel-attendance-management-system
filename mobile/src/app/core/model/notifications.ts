import { Users } from './users';

export class Notifications {
  notificationId: string;
  title: string;
  description: string;
  referenceId: string;
  isRead: boolean;
  forUser: Users;
  dateTime: string;
  type: 'ANNOUNCEMENT' | 'LINK_STUDENT' | 'STUDENT_LOGIN_LOGOUT';
}
