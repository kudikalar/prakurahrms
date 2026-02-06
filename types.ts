
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HR = 'HR',
  MANAGER = 'MANAGER',
  TRAINER = 'TRAINER',
  EMPLOYEE = 'EMPLOYEE',
  INTERN = 'INTERN'
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
  TRAINER = 'TRAINER'
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  employeeId?: string;
  avatar?: string;
}

export interface Employee {
  id: string;
  empCode: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  department: string;
  joiningDate: string;
  employmentType: EmploymentType;
  status: 'ACTIVE' | 'INACTIVE';
  salary: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'HALF_DAY';
}

export interface HRMSData {
  employees: Employee[];
  leaves: LeaveRequest[];
  attendance: AttendanceRecord[];
}
