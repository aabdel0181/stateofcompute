import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DePIN Analytics",
  description: "GPU Network Analytics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-black`}>
        <Navbar />
        <main className="dashboard-container">
          {children}
        </main>
      </body>
    </html>
  );
}