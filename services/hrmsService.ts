
import { getDB, saveDB } from '../store';
import { Employee, LeaveRequest, AttendanceRecord, LeaveStatus } from '../types';

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
  }
};
