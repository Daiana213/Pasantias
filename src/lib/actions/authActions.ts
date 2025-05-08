
'use server';

import { db } from '@/lib/firebase';
import { addDoc, collection, query, where, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import type { Student, Company } from '@/types';
import { sendAdminApprovalRequestEmail } from './notificationActions'; 

import * as z from "zod";

const studentFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  legajo: z.string().regex(/^\d+$/, { message: "El legajo debe ser numérico." }).min(1, {message: "El legajo no puede estar vacío."}),
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

    const { name, legajo, password } = validation.data;

    // Check if student already exists by legajo
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('legajo', '==', legajo));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, message: 'Un estudiante con este legajo ya existe.' };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create student with legajo and a placeholder/empty email
    const newStudent: Omit<Student, 'id'> = {
      name,
      legajo,
      email: `${legajo}@student.utn.placeholder`, // Placeholder email
      passwordHash,
      userType: 'student',
      isApproved: false,
      isEmailVerified: false, 
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    await addDoc(studentsRef, newStudent);

    await sendAdminApprovalRequestEmail({
      name: newStudent.name,
      identifier: newStudent.legajo, 
      identifierType: 'legajo',
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

    const companiesRef = collection(db, 'companies');
    const q = query(companiesRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, message: 'Una empresa con este correo electrónico ya existe.' };
    }

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
    
    await sendAdminApprovalRequestEmail({
      name: newCompany.companyName,
      identifier: newCompany.email, 
      identifierType: 'email',
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

