import HeaderNav from "@/components/header-nav";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex mt-4 mb-4 justify-center">
        <HeaderNav />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </main>
  );
}
