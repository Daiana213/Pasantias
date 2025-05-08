import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, UserPlus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Únete a AcreditaMe</h1>
        <p className="text-muted-foreground">Selecciona tu tipo de cuenta para comenzar.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <GraduationCap className="mr-2 text-primary" />
              Soy Estudiante
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Crea tu perfil, valida tus conocimientos y accede a nuevas oportunidades.
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/register/student">
                <UserPlus className="mr-2 h-4 w-4" /> Registrarme como Estudiante
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Briefcase className="mr-2 text-primary" />
              Soy Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Encuentra talento calificado y publica tus vacantes.
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/register/company">
                <UserPlus className="mr-2 h-4 w-4" /> Registrarme como Empresa
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Button variant="link" asChild className="p-0 h-auto text-primary">
          <Link href="/login">Inicia sesión aquí</Link>
        </Button>
      </p>
    </div>
  );
}
