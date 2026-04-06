import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pearl & Poise",
  description: "Elegant fashion for the modern woman.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.paystack.co/v1/inline.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}