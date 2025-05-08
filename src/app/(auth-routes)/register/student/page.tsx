import RegistrationFormStudent from "@/components/auth/RegistrationFormStudent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function RegisterStudentPage() {
  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
          <GraduationCap size={32} />
        </div>
        <CardTitle className="text-3xl font-bold text-primary">Registro de Estudiante</CardTitle>
        <CardDescription>Crea tu cuenta para empezar a construir tu futuro profesional.</CardDescription>
      </CardHeader>
      <CardContent>
        <RegistrationFormStudent />
      </CardContent>
    </Card>
  );
}
