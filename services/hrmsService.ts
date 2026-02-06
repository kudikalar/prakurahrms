
import { getDB, saveDB } from '../store';
import { Employee, LeaveRequest, AttendanceRecord, LeaveStatus, TrainingBatch, Intern, Faculty } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const hrmsService = {
  // Employee API
  async getEmployees(): Promise<Employee[]> {
    await delay(500);
    return getDB().employees;
  },

  async addEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    await delay(800);
    const db = getDB();
    const newEmployee = { ...employee, id: Math.random().toString(36).substr(2, 9) };
    db.employees.push(newEmployee);
    saveDB(db);
    return newEmployee;
  },

  // Leave API
  async getLeaves(employeeId?: string): Promise<LeaveRequest[]> {
    await delay(400);
    const db = getDB();
    if (employeeId) return db.leaves.filter(l => l.employeeId === employeeId);
    return db.leaves;
  },

  async applyLeave(leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>): Promise<LeaveRequest> {
    await delay(1000);
    const db = getDB();
    const newLeave: LeaveRequest = {
      ...leave,
      id: `LV-${Date.now()}`,
      status: LeaveStatus.PENDING,
      appliedDate: new Date().toISOString().split('T')[0]
    };
    db.leaves.unshift(newLeave);
    saveDB(db);
    return newLeave;
  },

  // Attendance API
  async punchIn(employeeId: string): Promise<AttendanceRecord> {
    await delay(500);
    const db = getDB();
    const newRecord: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      employeeId,
      date: new Date().toISOString().split('T')[0],
      checkIn: new Date().toLocaleTimeString(),
      status: 'PRESENT'
    };
    db.attendance.push(newRecord);
    saveDB(db);
    return newRecord;
  },

  async getAttendance(employeeId: string): Promise<AttendanceRecord[]> {
    await delay(300);
    return getDB().attendance.filter(a => a.employeeId === employeeId);
  },

  // Internship & Batch API
  async getBatches(): Promise<TrainingBatch[]> {
    await delay(500);
    return getDB().batches || [];
  },

  async createBatch(batch: Omit<TrainingBatch, 'id'>): Promise<TrainingBatch> {
    await delay(800);
    const db = getDB();
    const newBatch = { ...batch, id: `BT-${Date.now()}` };
    if (!db.batches) db.batches = [];
    db.batches.push(newBatch);
    saveDB(db);
    return newBatch;
  },

  async getInterns(batchId?: string): Promise<Intern[]> {
    await delay(400);
    const db = getDB();
    if (batchId) return (db.interns || []).filter(i => i.batchId === batchId);
    return db.interns || [];
  },

  async addIntern(intern: Omit<Intern, 'id'>): Promise<Intern> {
    await delay(600);
    const db = getDB();
    const newIntern = { ...intern, id: `INT-${Date.now()}` };
    if (!db.interns) db.interns = [];
    db.interns.push(newIntern);
    saveDB(db);
    return newIntern;
  },

  // Faculty API
  async getFaculties(): Promise<Faculty[]> {
    await delay(500);
    return getDB().faculties || [];
  },

  async addFaculty(faculty: Omit<Faculty, 'id'>): Promise<Faculty> {
    await delay(700);
    const db = getDB();
    const newFaculty = { ...faculty, id: `FAC-${Date.now()}` };
    if (!db.faculties) db.faculties = [];
    db.faculties.push(newFaculty);
    saveDB(db);
    return newFaculty;
  },

  async updateFaculty(id: string, updates: Partial<Faculty>): Promise<Faculty> {
    await delay(600);
    const db = getDB();
    const index = db.faculties.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Faculty not found');
    db.faculties[index] = { ...db.faculties[index], ...updates };
    saveDB(db);
    return db.faculties[index];
  },

  async deleteFaculty(id: string): Promise<void> {
    await delay(500);
    const db = getDB();
    db.faculties = db.faculties.filter(f => f.id !== id);
    saveDB(db);
  }
};
