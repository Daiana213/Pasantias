
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck, Hourglass } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function EmailValidationPendingPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const SAU_EMAIL = "sau.consultas.utn@utn.edu.ar"; // Generic SAU email

  if (type === 'registration_pending_approval') {
    return (
      <Card className="w-full max-w-lg text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
            <Hourglass size={40} />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">¡Solicitud de Registro Enviada!</CardTitle>
          <CardDescription className="text-lg">
            Tu solicitud de cuenta está pendiente de aprobación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Tu cuenta está siendo revisada por SAU (Sistema de Atención Universitaria) para su aprobación.
            Este proceso puede tomar algún tiempo.
          </p>
          <p className="mb-6 text-muted-foreground">
            Una vez que tu cuenta sea aprobada por SAU, te enviaremos un correo de validación a tu dirección de email para que puedas activar tu cuenta. Por favor, revisa tu bandeja de entrada (y la carpeta de spam) después de la aprobación.
          </p>
           <p className="mb-4 text-sm text-muted-foreground">
            Para consultas sobre el estado de tu aprobación o si tienes alguna duda durante este proceso, puedes contactar a SAU a través de: <span className="font-medium text-primary">{SAU_EMAIL}</span>.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/">Volver a la Página Principal</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Default case: User needs to validate their email (original content after SAU approval)
  // This screen would typically be reached if a user tries to log in with an approved but unvalidated email,
  // or clicks a "resend validation email" link if their initial one expired/was lost.
  return (
    <Card className="w-full max-w-md text-center shadow-xl">
      <CardHeader>
        <div className="mx-auto bg-accent/10 text-accent p-4 rounded-full w-fit mb-4">
          <MailCheck size={40} />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">¡Casi Listo! Valida tu Correo</CardTitle>
        <CardDescription className="text-lg">
          Hemos enviado un correo de validación a tu dirección de email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">
          Tu cuenta ha sido aprobada por SAU. Ahora, por favor, revisa tu bandeja de entrada (y la carpeta de spam) y haz clic en el enlace de validación para activar tu cuenta.
        </p>
        <p className="mb-2 text-sm text-muted-foreground">
          ¿No recibiste el correo de validación?
        </p>
        {/* This button would typically trigger a resend email action for the user's own validation email */}
        <Button variant="outline" className="mb-6" disabled> {/* Disabled for now as no backend action */}
          Reenviar Correo de Validación 
        </Button>
        <div className="mt-4">
          <Button asChild variant="link" className="text-primary">
            <Link href="/login">Volver a Iniciar Sesión</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
