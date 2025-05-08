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
import { Mail, Lock, LogIn as LogInIcon } from "lucide-react";
import Link from "next/link";
// import { loginUser } from "@/lib/actions/authActions"; // Assume this action exists or will be created

const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type LoginFormProps = {
  userType: "student" | "company";
};

export default function LoginForm({ userType }: LoginFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
      
      // Simulate setting auth state
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', userType);
      }

      // router.push(userType === 'student' ? '/student/dashboard' : '/company/dashboard');
      // For now, just log, actual redirection would happen after implementing auth state
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                Correo Electrónico
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu@correo.com" {...field} />
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
