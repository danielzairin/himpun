import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "himpun.dev",
  description: "A place to meet Malaysian developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
