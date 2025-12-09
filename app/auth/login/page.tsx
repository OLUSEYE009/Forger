"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { useLocalStorage } from "@/hooks/useLocalStorage";


interface User {
  email: string;
  passwordHash: string;
}

function LoginMessages() {
  const searchParams = useSearchParams();
  const signedUp = searchParams.get("signedup");

  if (signedUp) {
    return (
      <div className="bg-green-900/50 border border-green-700 text-green-200 p-3 rounded-md mb-4 text-sm">
        Account created successfully! Please log in.
      </div>
    );
  }
  return null;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users] = useLocalStorage<User[]>("users", []);
  const [, setCurrentUser] = useLocalStorage<User | null>("currentUser", null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");


    const user = users.find(
      (u) => u.email === email && u.passwordHash === password
    );

    if (user) {

      setCurrentUser({ email: user.email, passwordHash: user.passwordHash });

      router.push("/builder");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (

    <Suspense fallback={<div>Loading...</div>}>
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Log In to Your Account
      </h2>

      <LoginMessages />

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
              autoComplete="current-password"
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
            <FiLogIn className="mr-2 h-5 w-5" />
            Log In
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-primary-light hover:text-primary-light"
        >
          Sign up for free
        </Link>
      </p>
    </Suspense>
  );
}