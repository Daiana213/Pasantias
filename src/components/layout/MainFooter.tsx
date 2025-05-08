import Link from 'next/link';

export default function MainFooter() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AcreditaMe. Todos los derechos reservados.</p>
        <div className="mt-2">
          <Link href="/admin/login" className="text-xs hover:text-primary transition-colors">
            Portal de Administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
