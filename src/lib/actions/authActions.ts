
'use server';

import { db } from '@/lib/firebase';
import { addDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import type { Student, Company } from '@/types';
import { sendAdminApprovalRequestEmail } from './notificationActions'; // Assuming this is still used for simulation

// Zod schemas for validation (can be imported from form components or defined here)
import * as z from "zod";

const studentFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});
type StudentRegistrationInput = z.infer<typeof studentFormSchema>;


const companyFormSchema = z.object({
  companyName: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  companyDescription: z.string().min(10, {message: "La descripción debe tener al menos 10 caracteres."}).max(500, {message: "La descripción no puede exceder los 500 caracteres."}),
});
type CompanyRegistrationInput = z.infer<typeof companyFormSchema>;


export async function registerStudent(values: StudentRegistrationInput): Promise<{ success: boolean; message: string }> {
  try {
    const validation = studentFormSchema.safeParse(values);
    if (!validation.success) {
      return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
    }

    const { name, email, password } = validation.data;

    // Check if student already exists
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, message: 'Un estudiante con este correo electrónico ya existe.' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newStudent: Omit<Student, 'id'> = {
      name,
      email,
      passwordHash,
      userType: 'student',
      isApproved: false,
      isEmailVerified: false,
      createdAt: serverTimestamp() as Timestamp, // Firestore server timestamp
      updatedAt: serverTimestamp() as Timestamp,
    };

    await addDoc(studentsRef, newStudent);

    // Simulate sending admin approval email
    // In a real scenario, you might pass the new student's ID or more details
    await sendAdminApprovalRequestEmail({
      name: newStudent.name,
      email: newStudent.email,
      userType: 'student',
    });

    return { success: true, message: 'Registro de estudiante exitoso. Pendiente de aprobación.' };
  } catch (error) {
    console.error('Error registering student:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    return { success: false, message: `Error al registrar estudiante: ${errorMessage}` };
  }
}

export async function registerCompany(values: CompanyRegistrationInput): Promise<{ success: boolean; message: string }> {
  try {
    const validation = companyFormSchema.safeParse(values);
    if (!validation.success) {
      return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
    }
    const { companyName, email, password, companyDescription } = validation.data;

    // Check if company already exists
    const companiesRef = collection(db, 'companies');
    const q = query(companiesRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, message: 'Una empresa con este correo electrónico ya existe.' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newCompany: Omit<Company, 'id'> = {
      companyName,
      email,
      passwordHash,
      companyDescription,
      userType: 'company',
      isApproved: false,
      isEmailVerified: false,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    await addDoc(companiesRef, newCompany);
    
    // Simulate sending admin approval email
    await sendAdminApprovalRequestEmail({
      name: newCompany.companyName,
      email: newCompany.email,
      userType: 'company',
      description: newCompany.companyDescription,
    });

    return { success: true, message: 'Registro de empresa exitoso. Pendiente de aprobación.' };
  } catch (error) {
    console.error('Error registering company:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    return { success: false, message: `Error al registrar empresa: ${errorMessage}` };
  }
}

// Note: Login actions (findUserByEmail, verifyPassword) would be added here too.
// For now, the focus is on registration.
