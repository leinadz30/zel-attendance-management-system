import { Machines } from "./machines";
import { Students } from "./students";

export class TapLogs {
  tapLogId: string;
  status: string;
  dateTime: Date;
  machine: Machines;
  student: Students;
}
