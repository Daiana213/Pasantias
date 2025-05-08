import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, FileText } from "lucide-react";

export default function AdminDashboardPage() {
  // Placeholder data, replace with actual statistics
  const stats = [
    { title: "Usuarios Registrados", value: "1,250", icon: <Users className="text-primary" />, color: "text-primary" },
    { title: "Empresas Activas", value: "320", icon: <Users className="text-green-500" />, color: "text-green-500" },
    { title: "Acreditaciones Emitidas", value: "5,678", icon: <FileText className="text-blue-500" />, color: "text-blue-500" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md bg-opacity-20 ${stat.color.replace('text-', 'bg-')}`}>
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground pt-1">
                +10.5% desde el último mes
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 text-primary" />
            Estadísticas Generales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Gráficos y más estadísticas se mostrarán aquí.</p>
            <Image src="https://picsum.photos/800/400" alt="Placeholder chart" width={800} height={400} className="rounded-md mt-4" data-ai-hint="data analytics"/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Dummy Image component for placeholder
const Image = ({src, alt, width, height, className, "data-ai-hint": dataAiHint}: {src:string, alt:string, width:number, height:number, className?:string, "data-ai-hint":string}) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            data-ai-hint={dataAiHint}
            style={{objectFit: 'cover'}}
            loading="lazy"
        />
    )
}

// Dummy React component for cloneElement
import React from 'react';
