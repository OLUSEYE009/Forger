"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUserPlus, FiMail, FiLock } from "react-icons/fi";
import { useLocalStorage } from "@/hooks/useLocalStorage";


interface User {
  email: string;
  passwordHash: string; 
}

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useLocalStorage<User[]>("users", []);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }


    const newUser: User = { email, passwordHash: password };
    setUsers([...users, newUser]);

    // Redirect to login page with a success message
    router.push("/auth/login?signedup=true");
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Create Your Account
      </h2>
      
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email address
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-700 text-white"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
          >
            <FiUserPlus className="mr-2 h-5 w-5" />
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary-light hover:text-primary-light"
        >
          Log in here
        </Link>
      </p>
    </>
  );
}