import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zensorum | Discharge Command Center",
  description: "Governed Operational Execution Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full bg-[#070A0F] text-slate-200 antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
