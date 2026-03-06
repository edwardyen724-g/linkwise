import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LinkWise',
  description: 'Effortlessly manage and visualize your hierarchical linked records for research data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <main className="container mx-auto p-4">
            <h1 className="text-4xl font-bold">Transform Your Linked Data Management with LinkWise</h1>
            <p className="mt-2 text-lg">
              MVP Features: Hierarchical tree view for visualizing linked records, simple drag-and-drop interface for reorganizing linked records, customizable filters for quickly accessing specific data subsets, export options to CSV and other formats for analysis, and real-time collaboration with team members on linked records.
            </p>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}