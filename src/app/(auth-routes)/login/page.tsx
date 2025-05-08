"use client";

import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Briefcase } from "lucide-react";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">Iniciar Sesión</CardTitle>
        <CardDescription>Accede a tu cuenta de Pasantías</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="student">
              <GraduationCap className="mr-2 h-4 w-4" />
              Estudiante
            </TabsTrigger>
            <TabsTrigger value="company">
              <Briefcase className="mr-2 h-4 w-4" />
              Empresa
            </TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <LoginForm userType="student" />
          </TabsContent>
          <TabsContent value="company">
            <LoginForm userType="company" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

