
import type { Timestamp } from 'firebase/firestore';

export interface BaseUser {
  id?: string; // Firestore document ID
  email: string; // For companies, this is primary. For students, can be placeholder or derived.
  passwordHash: string;
  isApproved: boolean;
  isEmailVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Student extends BaseUser {
  userType: 'student';
  name: string;
  sysacadUser: string; // Primary identifier for students for login/registration
  // email field from BaseUser might be a placeholder or an actual contact email if gathered elsewhere.
}

export interface Company extends BaseUser {
  userType: 'company';
  companyName: string;
  companyDescription: string;
  // email field from BaseUser is the primary identifier for companies.
}

export type User = Student | Company;
