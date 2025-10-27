import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DCA Active Tokens",
  description: "View active tokens from the DCA smart contract with performance metrics",
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
