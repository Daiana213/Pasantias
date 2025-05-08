import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, LogIn as LogInIcon } from 'lucide-react'; // Changed LogIn to LogInIcon to avoid conflict

export default function MainHeader() {
  return (
    <header className="bg-card border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Pasantías UTN
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
              <LogInIcon className="mr-2 h-4 w-4" />
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
