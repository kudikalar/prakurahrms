
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
  designation: string;
  department: string;
  joiningDate: string;
  employmentType: EmploymentType;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SalaryRecord {
  basic: number;
  hra: number;
  allowance: number;
  pf: number;
  esi: number;
  tds: number;
  net: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  workingHours?: number;
}
