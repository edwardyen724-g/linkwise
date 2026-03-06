import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4">Transform Your Linked Data Management with LinkWise</h1>
      <p className="text-lg text-center mb-8">
        Effortlessly manage and visualize your hierarchical linked records for research data.
      </p>
      <div className="flex flex-col space-y-4">
        <Link href="/features" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
          Discover Features
        </Link>
        <Link href="/signup" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition">
          Get Started
        </Link>
      </div>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">MVP Features</h2>
        <ul className="list-disc list-inside">
          <li>Hierarchical tree view for visualizing linked records</li>
          <li>Simple drag-and-drop interface for reorganizing linked records</li>
          <li>Customizable filters for quickly accessing specific data subsets</li>
          <li>Export options to CSV and other formats for analysis</li>
          <li>Real-time collaboration with team members on linked records</li>
        </ul>
      </section>
    </main>
  );
};

export default HomePage;