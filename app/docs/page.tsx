import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiBookOpen, FiShare2, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-900 text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <FiBookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-white">Documentation</h1>
            <p className="mt-4 text-xl text-gray-300">
              Your guide to using Forger.
            </p>
          </div>

          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-8 space-y-10">
              
              <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                  Getting Started
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to PortfolioPro! This tool is designed to be the
                  fastest way to build and deploy a professional portfolio.
                  Here’s the simple 3-step process:
                </p>
                <ol className="list-decimal list-inside mt-4 space-y-2 text-gray-300">
                  <li><strong>Sign Up:</strong> Create a free account.</li>
                  <li><strong>Build:</strong> Go to the "Builder" page and fill in your details, projects, skills, and social links.</li>
                  <li><strong>View:</strong> Your portfolio is live-updated. You can share the link with anyone. (Note: For this demo, data is local).</li>
                </ol>
              </section>

              <hr className="border-gray-700" />

              <section>
                <h2 className="flex items-center text-3xl font-semibold text-white mb-4">
                  <FiShare2 className="mr-3 h-7 w-7 text-primary-light" />
                  How Your Data is Stored
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This version of PortfolioPro operates **without a backend database**. All the information you enter—your user account, your projects, your skills—is saved directly in your browser's{" "}
                  <code className="bg-gray-900 text-secondary px-2 py-1 rounded">
                    localStorage
                  </code>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded-lg border border-green-700">
                    <h3 className="flex items-center text-lg font-semibold text-white mb-2">
                      <FiCheckCircle className="mr-2 h-5 w-5 text-green-400" />
                      The Benefits
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li><strong>Speed:</strong> It's extremely fast.</li>
                      <li><strong>Privacy:</strong> Your data never leaves your computer.</li>
                      <li><strong>Cost:</strong> It's 100% free to run.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg border border-yellow-700">
                    <h3 className="flex items-center text-lg font-semibold text-white mb-2">
                      <FiAlertTriangle className="mr-2 h-5 w-5 text-yellow-400" />
                      The Limitations
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Data is tied to **one browser** on **one device**.</li>
                      <li>You cannot log in on a different computer.</li>
                      <li>Clearing your browser cache **will delete** your account and portfolio.</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <hr className="border-gray-700" />

              <section>
                <h2 className="text-3xl font-semibold text-white mb-4">
                  Next Steps
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Now that you have an account, you're ready to start building!
                  Head over to the "Builder" page to begin creating your
                  portfolio. If you have any questions, check out our FAQ page.
                </p>
                <a
                  href="/builder" // This page doesn't exist yet
                  className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md text-sm font-medium shadow-lg"
                >
                  Go to the Builder
                </a>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}