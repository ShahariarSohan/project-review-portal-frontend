import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Review Portal",
  description: "Web client for project submissions and mentor reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}