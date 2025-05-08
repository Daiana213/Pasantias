import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <section className="text-center mb-12">
        <Image 
          src="https://diagonalalaro.com.ar/wp-content/uploads/2018/03/UTN.png" 
          alt="Logo UTN"
          width={150} 
          height={75}
          className="mx-auto mb-6"
          data-ai-hint="university logo"
        />
        <h1 className="text-5xl font-bold text-primary mb-4">Pasantías UTN</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Conectando estudiantes y empresas para oportunidades de pasantías.
        </p>
      </section>

      <section className="w-full max-w-md mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Comienza Aquí
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button size="lg" asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/register">
                <UserPlus className="mr-2 h-5 w-5" /> Registrarse
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full">
              <Link href="/login">
                <LogIn className="mr-2 h-5 w-5" /> Iniciar Sesión
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <GraduationCap className="mr-3 text-primary" size={24} />
              Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Encuentra tu próxima oportunidad de pasantía.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Briefcase className="mr-3 text-primary" size={24} />
              Empresas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Descubre talento joven y motivado.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

