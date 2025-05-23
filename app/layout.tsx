import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ModalConfig from "./components/ModalConfig";
import "./globals.css";
import './components/styles/login.css';
import './components/styles/cadastro.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandora",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ModalConfig />
        {children}
      </body>
    </html>
  );
}
