
import type { Timestamp } from 'firebase/firestore';

export interface BaseUser {
  id?: string; // Firestore document ID
  email: string;
  passwordHash: string;
  isApproved: boolean;
  isEmailVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Student extends BaseUser {
  userType: 'student';
  name: string;
  // Add student-specific fields here
}

export interface Company extends BaseUser {
  userType: 'company';
  companyName: string;
  companyDescription: string;
  // Add company-specific fields here
}

export type User = Student | Company;
