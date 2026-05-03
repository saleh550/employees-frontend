type PayType = "hour" | "day";
type EmployeeStatus = "active" | "deleted";
type DayTypeType = "full" | "half";

export type EmployeeType = {
  _id: string;
  user: string;
  name: string;
  payType: PayType;
  rate: number;
  hireDate: Date;
  createdAt: Date;
  updatedAt: Date;
  workAmount: number;
  defaultStartTime?: string;
  defaultEndTime?: string;

  __v: number;
  status: EmployeeStatus;
};
export type WorkLogType = {
  _id: string;
  employee: string;
  user: string;
  date: string;
  type: string;
  dayType?: DayTypeType;
  startTime: string;
  endTime: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
export type UserType = {
  id: string;
  name: string;
  useName: string;
};
