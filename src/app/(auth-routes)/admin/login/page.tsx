import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
          <ShieldCheck size={32} />
        </div>
        <CardTitle className="text-3xl font-bold text-primary">Portal de Administración</CardTitle>
        <CardDescription>Acceso exclusivo para administradores.</CardDescription>
      </CardHeader>
      <CardContent>
        <AdminLoginForm />
      </CardContent>
    </Card>
  );
}
