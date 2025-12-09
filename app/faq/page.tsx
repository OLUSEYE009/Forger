"use client"; // We need this for the accordion's state

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiHelpCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";

// Reusable Accordion Item Component
function AccordionItem({ title, children }: {
  title: string,
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <span className="text-lg font-medium text-white">{title}</span>
        {isOpen ? (
          <FiChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <FiChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 pr-10 text-gray-300 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// Main FAQ Page
export default function FAQPage() {
  const faqData = [
    {
      q: "How is my data saved?",
      a: "Your portfolio data is saved directly in your browser's 'localStorage'. This means it's super fast and private, as your data never leaves your computer.",
    },
    {
      q: "Will my data be available on other devices?",
      a: "No. Because your data is stored locally in your browser, it will not be accessible on other computers or even in a different browser on the same computer.",
    },
    {
      q: "What happens if I clear my browser cache?",
      a: "Warning: If you clear your browser's 'localStorage' or 'site data', your account and all your portfolio information will be permanently deleted.",
    },
    {
      q: "Is this service really free?",
      a: "Yes! Since this demo version runs entirely in your browser without any backend servers or databases, it's 100% free to use.",
    },
    {
      q: "How can I share my portfolio?",
      a: "This demo doesn't currently support a live-hosted public URL. To share your work, you would typically deploy this project to a service like Vercel or Netlify and connect it to a real database.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-900 text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <FiHelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-white">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Find answers to common questions about Forger.
            </p>
          </div>

          <div className="bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="max-w-2xl mx-auto">
              {faqData.map((item, index) => (
                <AccordionItem key={index} title={item.q}>
                  <p>{item.a}</p>
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}