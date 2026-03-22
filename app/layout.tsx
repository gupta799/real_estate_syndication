import type { Metadata } from "next";

import { Header } from "@/components/header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Syndicate Lane",
  description: "Investor-first multifamily syndication marketplace MVP.",
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
