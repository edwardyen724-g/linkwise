import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Transform Your Linked Data Management with LinkWise</h1>
      <p className="text-lg text-gray-600 mb-8">
        Effortlessly manage and visualize your hierarchical linked records for research data.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Hierarchical Tree View</h2>
          <p className="text-gray-700">
            Visualize linked records in a tree structure for better comprehension of relationships.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Simple Drag-and-Drop</h2>
          <p className="text-gray-700">
            Easily reorganize linked records with our intuitive drag-and-drop interface.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Customizable Filters</h2>
          <p className="text-gray-700">
            Quickly access specific data subsets with advanced filtering options.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Export Options</h2>
          <p className="text-gray-700">
            Export your data to CSV and other formats for further analysis.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Real-Time Collaboration</h2>
          <p className="text-gray-700">
            Collaborate with team members seamlessly on linked records in real-time.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/signup" className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
          Get Started with LinkWise
        </Link>
      </div>
    </main>
  );
}