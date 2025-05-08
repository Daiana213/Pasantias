// @ts-nocheck
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, LogIn as LoginLucideIcon, UserCircle, LogOut as LogoutLucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This check will only run on the client side
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, []); // Empty dependency array ensures this runs once on mount and on route changes that re-mount this component.

  // Listen for storage changes to update header if login/logout happens in another tab.
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      const storedUserType = localStorage.getItem('userType');
      if (loggedInStatus === 'true') {
        setIsLoggedIn(true);
        setUserType(storedUserType);
      } else {
        setIsLoggedIn(false);
        setUserType(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
    router.push('/');
    // Optionally, refresh to ensure server state is cleared if necessary,
    // but for client-side changes, router.push is often enough.
    // router.refresh(); 
  };

  const getProfileLink = () => {
    if (userType === 'student') return '/student/dashboard';
    if (userType === 'company') return '/company/dashboard';
    if (userType === 'admin') return '/admin/dashboard';
    return '/'; // Fallback
  };

  // Prevent rendering based on localStorage until mounted
  if (typeof window === 'undefined') {
    // Return a placeholder or null during SSR/SSG if localStorage is critical for initial render
    // For now, let it render the default (logged-out) state server-side
  }


  return (
    <header className="bg-primary text-primary-foreground border-b border-primary-foreground/20">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-foreground">
          Pasantías UTN
        </Link>
        <div className="space-x-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href={getProfileLink()}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Perfil
                </Link>
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={handleLogout}>
                <LogoutLucideIcon className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Inicio
                </Link>
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href="/login">
                  <LoginLucideIcon className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </Link>
              </Button>
              <Button variant="default" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/register">
                  {/* UserPlus icon was not here before, keeping it text-only as per original */}
                  Registrarse
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
