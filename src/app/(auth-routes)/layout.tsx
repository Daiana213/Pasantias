export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center py-12 min-h-[calc(100vh-200px)]">
      {children}
    </div>
  );
}
