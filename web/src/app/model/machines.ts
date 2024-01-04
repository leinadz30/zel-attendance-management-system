import { Schools } from "./schools";
import { TapLogs } from "./tap-logs";
import { Users } from "./users";

export class Machines {
  machineId: string;
  machineCode: string;
  description: string;
  path: string;
  domain: string;
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
  createdByUser: Users;
  school: Schools;
  updatedByUser: Users;
  tapLogs: TapLogs[];
}
