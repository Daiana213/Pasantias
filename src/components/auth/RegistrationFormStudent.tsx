
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
import { User, Lock, UserPlus } from "lucide-react"; // Changed Mail to User
import Link from "next/link";
import { registerStudent } from "@/lib/actions/authActions";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  sysacadUser: z.string().min(2, { message: "El Usuario SYSACAD debe tener al menos 2 caracteres." }), // Changed from email
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

// Update StudentFormData to reflect sysacadUser instead of email
type StudentFormData = Omit<z.infer<typeof formSchema>, 'confirmPassword' | 'email'> & { sysacadUser: string };


export default function RegistrationFormStudent() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sysacadUser: "", // Changed from email
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...studentData } = values; 
    
    if (process.env.NEXT_PUBLIC_GITHUB_PAGES_DEPLOY === 'true') {
      console.warn("GitHub Pages mode: Simulating student registration server action.");
      toast({
        title: "Registro Enviado (Simulado)",
        description: "Tu solicitud de cuenta ha sido enviada para aprobación. (Esta es una simulación para GitHub Pages).",
        variant: "default",
      });
      form.reset();
      if (typeof window !== 'undefined') {
         window.location.href = '/email-validation-pending?type=registration_pending_approval';
      }
      return;
    }

    try {
      // Ensure studentData matches the expected input for registerStudent, which now takes sysacadUser
      const result = await registerStudent(studentData as StudentFormData);

      if (result.success) {
        toast({
          title: "Registro Enviado",
          description: "Tu solicitud de cuenta ha sido enviada para aprobación por SAU. Recibirás un correo de validación una vez que sea aprobada.",
          variant: "default",
        });
        form.reset();
        if (typeof window !== 'undefined') {
           window.location.href = '/email-validation-pending?type=registration_pending_approval';
        }
      } else {
        toast({
          title: "Error de Registro",
          description: result.message || "Hubo un problema al procesar tu solicitud.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during student registration process:", error);
      toast({
        title: "Error de Registro",
        description: "Hubo un problema al enviar tu solicitud. Por favor, intenta de nuevo más tarde o contacta a SAU.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Nombre Completo
              </FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sysacadUser" // Changed from email
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" /> {/* Changed icon */}
                Usuario SYSACAD
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="ej: nombre.apellido" {...field} /> {/* Changed placeholder and type */}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                Confirmar Contraseña
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
          <UserPlus className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? "Registrando..." : "Registrarme como Estudiante"}
        </Button>
        <div className="text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </form>
    </Form>
  );
}
