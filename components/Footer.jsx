import { FiGithub, FiX, FiLinkedin, FiCode } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-2 mb-8">
          <FiCode className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl text-white">Forger</span>
        </div>
        <div className="flex justify-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">GitHub</span>
            <FiGithub className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <FiX className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">LinkedIn</span>
            <FiLinkedin className="h-6 w-6" />
          </Link>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} Forger. All rights reserved.
        </p>
      </div>
    </footer>
  );
}