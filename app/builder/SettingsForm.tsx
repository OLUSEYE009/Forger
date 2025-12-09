"use client";

import { PortfolioData } from "@/types/portfolio";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import { FiDownload } from "react-icons/fi";

interface Props {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function SettingsForm({ data, setData }: Props) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDownloadPDF = () => {
    alert("Downloading pdf.......(Feature Under Development)");
    console.log("PDF download initiated (simulation)");
  };

  return (
    <div className="space-y-8">
      {/* SEO Controls */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Search Engine Optimization (SEO)</h3>
        <p className="text-gray-400 mb-6 text-sm">
          Control how your portfolio appears in Google search results and browser tabs.
        </p>
        
        <div className="space-y-4">
            <div>
                <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-300 mb-1">
                Browser Title
                </label>
                <Input
                id="seoTitle"
                name="seoTitle"
                value={data.seoTitle}
                onChange={handleChange}
                placeholder="e.g., John Doe | Senior Software Engineer"
                />
            </div>
            <div>
                <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-300 mb-1">
                SEO Description
                </label>
                <Textarea
                id="seoDescription"
                name="seoDescription"
                value={data.seoDescription}
                onChange={handleChange}
                placeholder="A short, catchy description of your skills and experience for search engines."
                />
            </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Export & Downloads</h3>
        <button
            onClick={handleDownloadPDF}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
            <FiDownload className="h-5 w-5 mr-2" />
            Download as PDF
        </button>
        <p className="text-gray-500 mt-2 text-sm">
            Note: Feature Under Development.
        </p>
      </div>
    </div>
  );
}