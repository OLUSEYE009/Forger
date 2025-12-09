import Link from "next/link";
import { FiCode } from "react-icons/fi";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 text-white">
          <FiCode className="h-10 w-10 text-primary" />
          <span className="font-bold text-3xl">Forger</span>
        </Link>
      </div>
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        {children}
      </div>
    </div>
  );
}