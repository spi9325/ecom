import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  title: "E-Com",
  description: "build by spi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="bg-gray-100">
        <NuqsAdapter>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
        </NuqsAdapter>
      </body>
    </html>
  );
}
