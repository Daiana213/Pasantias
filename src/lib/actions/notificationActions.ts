
'use server';

interface UserDetails {
  name: string;
  identifier: string; // Can be email or legajo
  identifierType: 'email' | 'legajo'; // Updated from 'sysacadUser' to 'legajo'
  userType: 'student' | 'company';
  description?: string; // For company
}

const ADMIN_EMAIL = 'daianapalacios213@gmail.com';

/**
 * Simulates sending an email to the administrator for account approval.
 */
export async function sendAdminApprovalRequestEmail(userDetails: UserDetails): Promise<{ success: boolean; message: string }> {
  console.log('Simulating sending approval request email...');
  console.log(`To: ${ADMIN_EMAIL}`);
  console.log(`From: noreply@acreditame.utn.edu.ar`);
  console.log(`Subject: Nueva solicitud de registro: ${userDetails.userType} - ${userDetails.name}`);
  
  let identifierLabel = '';
  if (userDetails.identifierType === 'email') {
    identifierLabel = 'Email';
  } else if (userDetails.identifierType === 'legajo') {
    identifierLabel = 'Legajo';
  }

  let emailBody = `
    Una nueva solicitud de registro ha sido recibida:

    Tipo de Usuario: ${userDetails.userType}
    Nombre: ${userDetails.name}
    ${identifierLabel}: ${userDetails.identifier}
  `;

  if (userDetails.userType === 'company' && userDetails.description) {
    emailBody += `
    Descripción de la Empresa: ${userDetails.description}
    `;
  }

  emailBody += `

    Por favor, revisa esta solicitud en el panel de administración.
  `;

  console.log('Email Body:', emailBody);

  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true, message: 'Approval request email simulated successfully.' };
}

