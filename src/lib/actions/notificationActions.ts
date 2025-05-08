
'use server';

interface UserDetails {
  name: string;
  email: string;
  userType: 'student' | 'company';
  description?: string; // For company
}

const ADMIN_EMAIL = 'daianapalacios213@gmail.com';

/**
 * Simulates sending an email to the administrator for account approval.
 * In a real application, this would use an email service (e.g., SendGrid, Nodemailer).
 * 
 * This function represents the first step: informing the admin.
 * The subsequent step (admin approves -> user gets validation email) is not implemented here
 * and would require backend logic to track approval status and trigger further emails.
 */
export async function sendAdminApprovalRequestEmail(userDetails: UserDetails): Promise<{ success: boolean; message: string }> {
  console.log('Simulating sending approval request email...');
  console.log(`To: ${ADMIN_EMAIL}`);
  console.log(`From: noreply@acreditame.utn.edu.ar`);
  console.log(`Subject: Nueva solicitud de registro: ${userDetails.userType} - ${userDetails.name}`);
  
  let emailBody = `
    Una nueva solicitud de registro ha sido recibida:

    Tipo de Usuario: ${userDetails.userType}
    Nombre: ${userDetails.name}
    Email: ${userDetails.email}
  `;

  if (userDetails.userType === 'company' && userDetails.description) {
    emailBody += `
    Descripción de la Empresa: ${userDetails.description}
    `;
  }

  emailBody += `

    Por favor, revisa esta solicitud en el panel de administración.
    (En una aplicación real, aquí habría un enlace para aprobar/rechazar directamente)
  `;

  console.log('Email Body:', emailBody);

  // Simulate network delay and success
  await new Promise(resolve => setTimeout(resolve, 500));

  // This simulation always succeeds. Error handling for email sending would be needed in a real app.
  return { success: true, message: 'Approval request email simulated successfully.' };
}
