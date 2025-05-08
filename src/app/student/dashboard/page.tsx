import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, FileText, Settings } from "lucide-react";
import Link from "next/link";
// import Image from "next/image"; // Image component no longer used

export default function StudentDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Panel de Estudiante</h1>
          <p className="text-muted-foreground">Bienvenido, [Nombre del Estudiante]. Gestiona tu perfil y oportunidades.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/student/profile/edit">
            <Settings className="mr-2 h-4 w-4" />
            Editar Perfil
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <GraduationCap className="mr-2 text-primary" />
              Mis Acreditaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Aún no tienes acreditaciones. ¡Empieza a validar tus habilidades!</p>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Ver Acreditaciones Disponibles</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Briefcase className="mr-2 text-primary" />
              Oportunidades Laborales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Explora ofertas de prácticas y empleo que coincidan con tu perfil.</p>
            <Button className="w-full">Buscar Oportunidades</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileText className="mr-2 text-primary" />
              Mi Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Completa tu perfil para aumentar tu visibilidad.</p>
            <div className="w-full h-2 bg-secondary rounded-full mb-2">
              <div className="h-2 bg-primary rounded-full" style={{ width: "60%" }}></div>
            </div>
            <p className="text-sm text-muted-foreground text-right">60% Completo</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Un resumen de tus últimas interacciones y notificaciones.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 bg-muted/20 rounded-md flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">No hay actividad reciente.</p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
