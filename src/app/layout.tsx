import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// const archivo = Archivo({
//   subsets: ["latin"],
//   weight: ['100','200','300','400','500','600','700','800','900'],
//   variable: "--font-archivo",
// });

export const metadata: Metadata = {
  title: "Homebase media",
  description: "Homebase media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
