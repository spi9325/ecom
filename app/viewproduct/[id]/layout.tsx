import { Navbar } from "@/app/(home)/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function ViewCartLayout({
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
