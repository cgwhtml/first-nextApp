import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1>我是根</h1>
        {children}
      </body>
    </html>
  );
}
