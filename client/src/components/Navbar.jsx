import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <svg
                className="h-8 w-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L2 7v6c0 5 5 10 10 10s10-5 10-10V7L12 2z" />
              </svg>
              <span className="font-semibold text-lg text-gray-800">
                YourBrand
              </span>
            </a>
          </div>

          <div className="hidden md:flex md:space-x-6">
            <a
              href="/"
              className="text-gray-600 hover:text-indigo-600 px-2 py-1 rounded"
            >
              Home
            </a>
            <a
              href="/"
              className="text-gray-600 hover:text-indigo-600 px-2 py-1 rounded"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 px-2 py-1 rounded"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 px-2 py-1 rounded"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex sm:items-center sm:space-x-3">
              <a
                href="/signin"
                className="text-gray-600 hover:text-indigo-600 px-3 py-1"
              >
                Sign in
              </a>
              <a
                href="/signup"
                className="inline-flex items-center px-4 py-1.5 bg-indigo-600 border border-transparent text-white text-sm font-medium rounded-md hover:bg-indigo-700"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
