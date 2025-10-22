import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Chat",
  description: "Chat with everyone on the platform",
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

