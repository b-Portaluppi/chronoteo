import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ContainerSession } from "@/components/containerSession";
import { Header } from "@/components/header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "CHRONOTEO",
  description: "Sua agenda fácil de usar",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
      >
        <ContainerSession>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <Header />
          {children}
        </ContainerSession>
      </body>
    </html>
  );
}
