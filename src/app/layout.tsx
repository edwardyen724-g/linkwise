import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkWise",
  description: "Effortlessly manage and visualize your hierarchical linked records for research data.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
              <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">Transform Your Linked Data Management with LinkWise</h1>
                <p className="mt-2 text-lg text-gray-600">{metadata.description}</p>
              </div>
            </header>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}