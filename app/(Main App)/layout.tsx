import HeaderNav from "@/components/header-nav";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <HeaderNav />
      <div className="flex-1">
        {children}
      </div>
    </main>
  );
}
