import { Employees } from './employees';
import { Machines } from './machines';
import { Students } from './students';

export class TapLogs {
  tapLogId: string;
  status: string;
  date: Date;
  time: string;
  machine: Machines;
  student: Students;
  employees: Employees;
}
