"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PortfolioData } from "@/types/portfolio";
import { FiUser, FiBriefcase, FiCode, FiLink, FiCheckCircle, FiExternalLink, FiMonitor, FiDownload, FiX, FiBriefcase as FiWork, FiSettings, FiAlertTriangle } from "react-icons/fi"; 
import { generatePortfolioHTML } from "@/utils/generateHtml"; 

import ProfileForm from "./ProfileForm";
import ProjectsForm from "./ProjectsForm";
import SkillsForm from "./SkillsForm";
import SocialsForm from "./SocialsForm";
import DesignForm from "./DesignForm";
import ExperienceForm from "./ExperienceForm"; 
import SettingsForm from "./SettingsForm";   

interface User {
  email: string;
}

const defaultPortfolioData: PortfolioData = {
  fullName: "Your Name",
  headline: "Your Job Title",
  bio: "A short bio...",
  skills: ["JavaScript", "React"],
  projects: [],
  socials: { github: "", linkedin: "", twitter: "", website: "" },
  theme: "indigo",
  experience: [],
  education: [],
  layoutStyle: 'classic', 
  seoTitle: "My Awesome Portfolio",
  seoDescription: "A portfolio showcasing my skills and projects.",
};

type Tab = "profile" | "experience" | "projects" | "skills" | "socials" | "design" | "settings";

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [currentUser] = useLocalStorage<User | null>("currentUser", null);
  const [showCodeModal, setShowCodeModal] = useState(false); 

  const userPortfolioKey = `portfolio-${currentUser?.email}`;
  const [data, setData] = useLocalStorage<PortfolioData>(
    userPortfolioKey,
    defaultPortfolioData
  );

  const tabs = [
    { id: "profile", name: "Profile", icon: FiUser },
    { id: "experience", name: "Experience", icon: FiWork }, // New Tab
    { id: "projects", name: "Projects", icon: FiBriefcase },
    { id: "skills", name: "Skills", icon: FiCode },
    { id: "socials", name: "Socials", icon: FiLink },
    { id: "design", name: "Design", icon: FiMonitor },
    { id: "settings", name: "Settings", icon: FiSettings }, // New Tab
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileForm data={data} setData={setData} />;
      case "experience": return <ExperienceForm data={data} setData={setData} />; 
      case "projects": return <ProjectsForm data={data} setData={setData} />;
      case "skills": return <SkillsForm data={data} setData={setData} />;
      case "socials": return <SocialsForm data={data} setData={setData} />;
      case "design": return <DesignForm data={data} setData={setData} />;
      case "settings": return <SettingsForm data={data} setData={setData} />; 
      default: return null;
    }
  };

  const handleCopyCode = () => {
    const html = generatePortfolioHTML(data);
    navigator.clipboard.writeText(html);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden min-h-[600px]">
      
      {/* Header and Save Status */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-5 bg-gray-800 border-b border-gray-700 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Your Portfolio</h1>
          <div className="flex items-center text-sm text-green-400 mt-1">
            <FiCheckCircle className="h-4 w-4 mr-1.5" />
            <span>All changes saved automatically</span>
          </div>
        </div>
        
        <div className="flex gap-3">
            <button
              onClick={() => setShowCodeModal(true)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              <FiDownload className="h-4 w-4" />
              <span>Get Code</span>
            </button>
            <a
                href={`/p/${currentUser?.email}`}
                target="_blank"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-lg"
            >
                <span>View Live</span>
                <FiExternalLink className="h-4 w-4" />
            </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <nav className="w-full md:w-64 bg-gray-900 p-4 border-b md:border-b-0 md:border-r border-gray-700">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center w-full px-4 py-2.5 rounded-md text-sm font-medium transition-colors
                    ${activeTab === tab.id ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
                  `}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 p-6 md:p-10">
          
          {/* IMAGE FEATURE WARNING */}
          <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-md text-yellow-100 mb-6 flex items-start gap-3">
              <FiAlertTriangle className="h-5 w-5 mt-0.5 text-yellow-400 flex-shrink-0" />
              <div>
                  <h4 className="font-semibold">Image Feature Warning (Intentional Exclusion)</h4>
                  <p className="text-sm">
                      We cannot implement image uploading here. Since this app uses local browser storage (<code className="bg-yellow-800 px-1 rounded">localStorage</code>), storing images would cause the application to crash or run extremely slowly. You will be informed when we update it.
                  </p>
              </div>
          </div>
          {/* END WARNING */}

          {renderTabContent()}
        </div>
      </div>

      {/* Code Export Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">Export Your Code</h3>
                <button onClick={() => setShowCodeModal(false)} className="text-gray-400 hover:text-white">
                    <FiX className="h-6 w-6" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto bg-gray-900/50">
                <p className="text-gray-300 mb-4 text-sm">
                    Copy this code and save it as an <code>index.html</code> file. You can open it in any browser or upload it to a host.
                </p>
                <div className="relative">
                    <pre className="bg-black text-green-400 p-4 rounded-md text-xs overflow-x-auto h-64 font-mono">
                        {generatePortfolioHTML(data)}
                    </pre>
                    <button 
                        onClick={handleCopyCode}
                        className="absolute top-2 right-2 bg-white text-gray-900 px-3 py-1 rounded text-xs font-bold hover:bg-gray-200"
                    >
                        Copy
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}