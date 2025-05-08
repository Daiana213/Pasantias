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
// import { loginAdmin } from "@/lib/actions/authActions"; // Assume this action exists

const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export default function AdminLoginForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const result = await loginAdmin(values); // Placeholder for server action
    // For demonstration, simulating API call
    console.log("Admin login attempt:", values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Example: Hardcoded admin credentials for demo
    const isAdmin = values.email === "admin@acreditame.com" && values.password === "adminpass";
    const result = isAdmin 
        ? { success: true, message: "Inicio de sesión de administrador exitoso." }
        : { success: false, message: "Credenciales de administrador incorrectas." };


    if (result.success) {
      toast({
        title: "Inicio de Sesión Exitoso",
        description: result.message || `Bienvenido Administrador! Redirigiendo...`,
        variant: "default",
      });
      
      // Simulate setting auth state
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'admin');
      }
      
      // router.push('/admin/dashboard');
      window.location.href = '/admin/dashboard';
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
                <Input type="email" placeholder="admin@correo.com" {...field} />
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
          Acceder como Administrador
        </Button>
      </form>
    </Form>
  );
}
