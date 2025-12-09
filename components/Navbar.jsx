
"use client"; 

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiCode } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/docs", label: "Docs" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="font-bold text-2xl">Forger</span>
              <FiCode className="h-8 w-8 text-primary" />
            </Link>
          </div>


          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>


      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-primary hover:bg-primary-dark text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}