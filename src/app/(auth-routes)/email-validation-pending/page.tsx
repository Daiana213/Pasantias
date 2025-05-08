import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function EmailValidationPendingPage() {
  return (
    <Card className="w-full max-w-md text-center shadow-xl">
      <CardHeader>
        <div className="mx-auto bg-accent/10 text-accent p-4 rounded-full w-fit mb-4">
          <MailCheck size={40} />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">¡Casi Listo!</CardTitle>
        <CardDescription className="text-lg">
          Hemos enviado un correo de validación a tu dirección de email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">
          Por favor, revisa tu bandeja de entrada (y la carpeta de spam) y haz clic en el enlace de validación para activar tu cuenta.
        </p>
        <p className="mb-2 text-sm text-muted-foreground">
          ¿No recibiste el correo?
        </p>
        <Button variant="outline" className="mb-6">
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
