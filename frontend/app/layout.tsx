import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Security Scanner",
  description: "Analyze GitHub repos for security, privacy, and compliance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
