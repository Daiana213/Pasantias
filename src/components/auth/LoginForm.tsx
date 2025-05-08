
// @ts-nocheck
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, LogIn as LogInIcon, User } from "lucide-react"; // Added User icon
import Link from "next/link";

type LoginFormProps = {
  userType: "student" | "company";
};

// Define schema dynamically based on userType
const getFormSchema = (userType: "student" | "company") => z.object({
  identifier: userType === 'student'
    ? z.string().min(2, { message: "Usuario SYSACAD debe tener al menos 2 caracteres." })
    : z.string().email({ message: "Por favor ingresa un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});


export default function LoginForm({ userType }: LoginFormProps) {
  const { toast } = useToast();
  const formSchema = getFormSchema(userType);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const result = await loginUser(values, userType); // Placeholder for server action
    // For demonstration, simulating API call
    console.log("Login attempt:", values, "as", userType);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success for any credentials for now
    const result = { success: true, message: `Inicio de sesión como ${userType} exitoso.` };


    if (result.success) {
      toast({
        title: "Inicio de Sesión Exitoso",
        description: result.message || `Bienvenido de nuevo! Redirigiendo...`,
        variant: "default",
      });
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', userType);
      }

      if (userType === 'student') {
        window.location.href = '/student/dashboard';
      } else {
        window.location.href = '/company/dashboard';
      }

    } else {
      toast({
        title: "Error de Inicio de Sesión",
        description: result.message || "Credenciales incorrectas. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
  }

  const identifierLabel = userType === 'student' ? "Usuario SYSACAD" : "Correo Electrónico";
  const identifierPlaceholder = userType === 'student' ? "ej: nombre.apellido" : "tu@correo.com";
  const IdentifierIcon = userType === 'student' ? User : Mail;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="identifier" // Changed from email to identifier
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <IdentifierIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {identifierLabel}
              </FormLabel>
              <FormControl>
                <Input type={userType === 'student' ? "text" : "email"} placeholder={identifierPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                Contraseña
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          <LogInIcon className="mr-2 h-4 w-4" />
          Iniciar Sesión
        </Button>
        <div className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href={userType === 'student' ? "/register/student" : "/register/company"} className="font-medium text-primary hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </form>
    </Form>
  );
}
