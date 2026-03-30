import type { Metadata } from "next";

import { Header } from "@/components/header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Syndicate Lane",
  description: "Investor-first sponsor intelligence directory for historical syndication track records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="site-shell">{children}</main>
      </body>
    </html>
  );
}
