
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
  attendance: [],
  batches: [
    { 
      id: 'b1', 
      name: 'MERN Stack Mastery', 
      code: 'BATCH-2024-01', 
      trainerId: 'f1', 
      trainerName: 'Vikram Sahai', 
      startDate: '2024-01-10', 
      endDate: '2024-06-10', 
      progress: 75, 
      status: 'ACTIVE',
      timings: '09:00 AM - 11:30 AM',
      curriculum: ['NodeJS Basics', 'React Context API', 'MongoDB Aggregations', 'Deployment']
    },
    { 
      id: 'b2', 
      name: 'Python for Data Science', 
      code: 'BATCH-2024-02', 
      trainerId: 'f2', 
      trainerName: 'Dr. Aruna Reddy', 
      startDate: '2024-03-15', 
      endDate: '2024-09-15', 
      progress: 30, 
      status: 'ACTIVE',
      timings: '02:00 PM - 04:30 PM',
      curriculum: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn']
    }
  ],
  interns: [
    { id: 'i1', batchId: 'b1', firstName: 'Anjali', lastName: 'Kaur', email: 'anjali.k@edu.in', college: 'IIT Delhi', performanceScore: 85, joinDate: '2024-01-10' },
    { id: 'i2', batchId: 'b1', firstName: 'Sameer', lastName: 'Khan', email: 'sameer.k@edu.in', college: 'BITS Pilani', performanceScore: 92, joinDate: '2024-01-10' }
  ],
  faculties: [
    {
      id: 'f1',
      name: 'Vikram Sahai',
      designation: 'Principal Trainer',
      specialty: ['Full Stack', 'Cloud Architecture'],
      experience: '12+ Years',
      email: 'vikram.s@prakura.in',
      status: 'ACTIVE',
      activeBatches: ['b1']
    },
    {
      id: 'f2',
      name: 'Dr. Aruna Reddy',
      designation: 'Sr. Data Scientist',
      specialty: ['AI/ML', 'Big Data', 'Python'],
      experience: '15+ Years',
      email: 'aruna.r@prakura.in',
      status: 'ACTIVE',
      activeBatches: ['b2']
    },
    {
      id: 'f3',
      name: 'Siddharth Rao',
      designation: 'Solutions Architect',
      specialty: ['DevOps', 'AWS', 'Microservices'],
      experience: '10+ Years',
      email: 'siddharth.r@prakura.in',
      status: 'ACTIVE',
      activeBatches: []
    }
  ]
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
