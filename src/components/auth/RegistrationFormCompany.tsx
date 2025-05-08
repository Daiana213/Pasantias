
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building, Mail, Lock, Info, UserPlus } from "lucide-react";
import Link from "next/link";
// import { sendAdminApprovalRequestEmail } from "@/lib/actions/notificationActions"; // This is now called within registerCompany
import { registerCompany } from "@/lib/actions/authActions";

const formSchema = z.object({
  companyName: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres." }),
  companyDescription: z.string().min(10, {message: "La descripción debe tener al menos 10 caracteres."}).max(500, {message: "La descripción no puede exceder los 500 caracteres."}),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

type CompanyFormData = Omit<z.infer<typeof formSchema>, 'confirmPassword'>;

export default function RegistrationFormCompany() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...companyData } = values; // Exclude confirmPassword

    // For GitHub Pages, server actions are simulated to prevent errors.
    if (process.env.NEXT_PUBLIC_GITHUB_PAGES_DEPLOY === 'true') {
      console.warn("GitHub Pages mode: Simulating company registration server action.");
      toast({
        title: "Registro Enviado (Simulado)",
        description: "La solicitud de cuenta para su empresa ha sido enviada para aprobación. (Esta es una simulación para GitHub Pages).",
        variant: "default",
      });
      form.reset();
      if (typeof window !== 'undefined') {
        window.location.href = '/email-validation-pending?type=registration_pending_approval';
      }
      return;
    }

    try {
      const result = await registerCompany(companyData as CompanyFormData);
      
      if (result.success) {
        toast({
          title: "Registro Enviado",
          description: "La solicitud de cuenta para su empresa ha sido enviada para aprobación por SAU. Recibirá un correo de validación una vez que sea aprobada.",
          variant: "default",
        });
        form.reset();
        if (typeof window !== 'undefined') {
          window.location.href = '/email-validation-pending?type=registration_pending_approval';
        }
      } else {
         toast({
          title: "Error de Registro",
          description: result.message || "Hubo un problema al procesar la solicitud de su empresa.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during company registration process:", error);
      toast({
        title: "Error de Registro",
        description: "Hubo un problema al enviar su solicitud. Por favor, intente de nuevo más tarde o contacte a SAU.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                Nombre de la Empresa
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre de tu empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                Correo Electrónico de Contacto
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="contacto@tuempresa.com" {...field} />
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
        <FormField
          control={form.control}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                Descripción de la Empresa
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Describe brevemente tu empresa, su misión y lo que busca." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
          <UserPlus className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? "Registrando..." : "Registrar Empresa"}
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
