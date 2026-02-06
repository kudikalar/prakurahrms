
import { HRMSData, Role, EmploymentType, LeaveStatus } from './types';

const STORAGE_KEY = 'prakura_hrms_db';

const initialData: HRMSData = {
  employees: [
    { id: '1', empCode: 'PRK-1001', firstName: 'Rahul', lastName: 'Verma', email: 'rahul.v@prakura.in', department: 'Engineering', designation: 'Sr. Developer', joiningDate: '2023-01-15', employmentType: EmploymentType.FULL_TIME, status: 'ACTIVE', salary: 85000 },
    { id: '2', empCode: 'PRK-1002', firstName: 'Sneha', lastName: 'Rao', email: 'sneha.r@prakura.in', department: 'HR', designation: 'HR Lead', joiningDate: '2022-06-10', employmentType: EmploymentType.FULL_TIME, status: 'ACTIVE', salary: 65000 },
    { id: '3', empCode: 'PRK-1003', firstName: 'Vikram', lastName: 'Sahai', email: 'vikram.s@prakura.in', department: 'Training', designation: 'Lead Trainer', joiningDate: '2023-03-01', employmentType: EmploymentType.TRAINER, status: 'ACTIVE', salary: 55000 },
  ],
  leaves: [
    { id: 'l1', employeeId: '1', type: 'Casual Leave', from: '2024-05-20', to: '2024-05-22', days: 3, reason: 'Personal work', status: LeaveStatus.PENDING, appliedDate: '2024-05-15' }
  ],
  attendance: []
};

export const getDB = (): HRMSData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

export const saveDB = (data: HRMSData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
