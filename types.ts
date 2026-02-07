
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HR_ADMIN = 'HR_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  TRAINER = 'TRAINER',
  INTERN = 'INTERN',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  FACULTY = 'FACULTY'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  WFH = 'WFH',
  HALFDAY = 'HALFDAY'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  designation: string;
  department: string;
  joinDate: string;
  profileImage?: string;
}

export interface Faculty extends User {
  specialization: string[];
  experienceYears: number;
  assignedBatches: string[];
  rating: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'LAPTOP' | 'ID_CARD' | 'ACCESS_KEY' | 'MOBILE';
  serialNumber: string;
  allocatedTo?: string;
  status: 'FUNCTIONAL' | 'DAMAGED' | 'RETURNED';
  allocatedDate?: string;
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  category: 'PAYROLL' | 'LEAVE' | 'IT' | 'FACILITY';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  enrolledInterns: number;
}

export interface LeaveRecord {
  id: string;
  userId: string;
  type: 'CL' | 'SL' | 'PL' | 'LOP';
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason: string;
}

export interface DBConnectionState {
  status: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR';
  engineStatus: 'IDLE' | 'GENERATING' | 'READY';
  latency: number;
  activePools: number;
  lastMigration: string;
  databaseName: string;
  prismaVersion: string;
}
