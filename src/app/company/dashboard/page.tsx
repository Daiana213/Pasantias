import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CompanyDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Panel de Empresa</h1>
          <p className="text-muted-foreground">Bienvenido, [Nombre de la Empresa]. Gestiona tus ofertas y candidatos.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/company/profile/edit">
            <Settings className="mr-2 h-4 w-4" />
            Editar Perfil de Empresa
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Briefcase className="mr-2 text-primary" />
              Mis Ofertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Tienes 2 ofertas activas y 5 candidatos.</p>
            <Button className="w-full">Gestionar Ofertas</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2 text-primary" />
              Buscar Talento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Explora perfiles de estudiantes y profesionales cualificados.</p>
            <Button className="w-full">Buscar Candidatos</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow bg-accent text-accent-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <PlusCircle className="mr-2" />
              Publicar Nueva Oferta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="opacity-80 mb-4">Atrae al mejor talento publicando tu nueva vacante.</p>
            <Button variant="secondary" className="w-full">Crear Oferta</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidatos Recientes</CardTitle>
          <CardDescription>Últimos candidatos que han aplicado a tus ofertas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src="https://picsum.photos/800/300" data-ai-hint="candidate list" alt="Candidate list placeholder" width={800} height={300} className="rounded-md object-cover" />
          <p className="text-muted-foreground mt-4 text-center">No hay candidatos recientes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
