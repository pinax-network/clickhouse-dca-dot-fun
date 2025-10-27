import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClickHouse Data Viewer",
  description: "NextJS application displaying ClickHouse data using SSR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
