import { Navigation, Footer } from "@/components/organisms";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="w-full sticky top-0 z-[999]">
        <Navigation />
      </div>
      {children}
      <Footer />
    </div>
  );
}
