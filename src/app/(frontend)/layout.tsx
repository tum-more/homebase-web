import { Footer } from "@/components/organisms/Footer";
import Navigation from "@/components/organisms/Navigation";

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
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
