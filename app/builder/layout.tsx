/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser, FiCode } from "react-icons/fi";


interface User {
  email: string;
}

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(
    "currentUser",
    null
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user on mount
    if (!currentUser) {
      router.replace("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [currentUser, router]);

  const handleLogout = () => {
    setCurrentUser(null);
    router.replace("/");
  };

  if (isLoading) {
    // Show a loading screen while we check auth
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <FiCode className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Builder-specific Navbar */}
      <nav className="bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <FiCode className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-white">
               Forger-Portfolio Builder
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300 hidden sm:block">
                <FiUser className="inline h-4 w-4 mr-1" />
                {currentUser?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-red-600 px-3 py-2 rounded-md transition-colors"
              >
                <FiLogOut className="mr-1.5 h-4 w-4" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}