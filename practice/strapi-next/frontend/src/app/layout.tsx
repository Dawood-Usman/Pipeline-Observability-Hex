import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {CategoryProvider} from '@/context/CategoryContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto max-w-screen-lg">
          <CategoryProvider>
            <div className="flex flex-col items-center min-h-screen p-24">
              {children}
            </div>
          </CategoryProvider>
        </div>
      </body>
    </html>
  );
}
