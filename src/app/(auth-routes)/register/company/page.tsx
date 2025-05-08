import RegistrationFormCompany from "@/components/auth/RegistrationFormCompany";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function RegisterCompanyPage() {
  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
          <Briefcase size={32} />
        </div>
        <CardTitle className="text-3xl font-bold text-primary">Registro de Empresa</CardTitle>
        <CardDescription>Crea una cuenta para tu empresa y encuentra el mejor talento.</CardDescription>
      </CardHeader>
      <CardContent>
        <RegistrationFormCompany />
      </CardContent>
    </Card>
  );
}
