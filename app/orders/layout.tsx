import { Navbar } from "@/app/(home)/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main>
        <SessionProvider>
        <Navbar/>
        {children}
        </SessionProvider>
      </main>
  );
}
