import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">Bienvenido a AcreditaMe</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tu plataforma integral para la acreditación y conexión entre estudiantes talentosos y empresas innovadoras.
        </p>
      </section>

      <Image 
        src="https://picsum.photos/1200/400"
        alt="Banner AcreditaMe"
        width={1200}
        height={400}
        className="rounded-lg shadow-lg mb-12 object-cover"
        data-ai-hint="team collaboration"
      />

      <section className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <GraduationCap className="mr-3 text-primary" size={28} />
              Para Estudiantes
            </CardTitle>
            <CardDescription>
              Crea tu perfil, muestra tus habilidades y accede a oportunidades únicas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Regístrate para validar tus competencias, obtener certificaciones y conectar con el mundo laboral.
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
            <CardTitle className="flex items-center text-2xl">
              <Briefcase className="mr-3 text-primary" size={28} />
              Para Empresas
            </CardTitle>
            <CardDescription>
              Encuentra talento verificado y publica tus ofertas de prácticas o empleo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Únete para descubrir profesionales cualificados y agilizar tus procesos de selección.
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/register/company">
                <UserPlus className="mr-2 h-4 w-4" /> Registrarme como Empresa
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">¿Ya tienes una cuenta?</h2>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/login">
            <LogIn className="mr-2 h-5 w-5" /> Iniciar Sesión
          </Link>
        </Button>
      </section>
    </div>
  );
}
