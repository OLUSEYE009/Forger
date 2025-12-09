import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiLayout, FiEdit, FiShare2, FiStar, FiChevronRight } from "react-icons/fi";


function FeatureCard({ icon: Icon, title, children }: {
  icon: React.ElementType,
  title: string,
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">
        {children}
      </p>
    </div>
  );
}


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-32 text-center bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Create Your <span className="text-primary-light">Stunning</span> Portfolio
              in Minutes
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              No backend required. No complex setup. Just you, your projects,
              and a beautiful, fast portfolio stored right in your browser.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-lg transform transition-transform hover:scale-105"
              >
                Get Started for Free
                <FiChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transform transition-transform hover:scale-105"
              >
                Read Docs
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
                Features
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Everything you need. Nothing you don&apos;t.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <FeatureCard icon={FiLayout} title="Beautiful Templates">
                Choose from a selection of modern, responsive templates. Your
                content will look amazing on any device.
              </FeatureCard>
              <FeatureCard icon={FiEdit} title="Simple Live Editor">
                Edit your details, projects, and skills with a live preview.
                What you see is exactly what you get.
              </FeatureCard>
              <FeatureCard icon={FiShare2} title="No Backend Needed">
                All your data is securely saved in your browser&apos;s
                localStorage. It&apos;s fast, private, and 100% free.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* cta Section */}
        <section className="bg-gray-800">
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to build your portfolio?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Join free today. Start showcasing your work to the world in just
              a few minutes.
            </p>
            <Link
              href="/auth/signup"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-lg transform transition-transform hover:scale-105"
            >
              Sign Up and Start Building
              <FiStar className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}