import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, Home } from 'lucide-react';

export default function MainHeader() {
  return (
    <header className="bg-card border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          AcreditaMe
        </Link>
        <div className="space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Link>
          </Button>
          <Button variant="default" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/register">
              Registrarse
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

// Placeholder LogIn icon, replace if you have a specific one
const LogIn = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" x2="3" y1="12" y2="12" />
  </svg>
);
