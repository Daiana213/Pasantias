
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
import { User, Lock, UserPlus, Hash } from "lucide-react"; // Added Hash for Legajo
import Link from "next/link";
import { registerStudent } from "@/lib/actions/authActions";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  legajo: z.string().regex(/^\d+$/, { message: "El legajo debe ser numérico." }).min(1, {message: "El legajo no puede estar vacío."}),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

// This type is for the form data itself including confirmPassword
type StudentFormValues = z.infer<typeof formSchema>;
// This type is for the data passed to the action, excluding confirmPassword
type StudentActionInput = Omit<StudentFormValues, 'confirmPassword'>;


export default function RegistrationFormStudent() {
  const { toast } = useToast();
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      legajo: "", 
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: StudentFormValues) {
    const { confirmPassword, ...studentDataForAction } = values; 
    
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
      const result = await registerStudent(studentDataForAction as StudentActionInput);

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
          name="legajo" 
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Hash className="mr-2 h-4 w-4 text-muted-foreground" /> 
                Legajo
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="ej: 12345" {...field} /> 
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

