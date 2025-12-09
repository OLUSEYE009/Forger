"use client";

import { PortfolioData } from "@/types/portfolio";
import { FiCheck } from "react-icons/fi";

interface Props {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const themes = [
  { id: "indigo", name: "Indigo", color: "bg-indigo-500" },
  { id: "emerald", name: "Emerald", color: "bg-emerald-500" },
  { id: "rose", name: "Rose", color: "bg-rose-500" },
  { id: "amber", name: "Amber", color: "bg-amber-500" },
  { id: "blue", name: "Blue", color: "bg-blue-500" },
];

export default function DesignForm({ data, setData }: Props) {
  return (
    <div className="space-y-8">
      
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Choose a Color Theme</h3>
        <p className="text-gray-400 mb-6 text-sm">
          This color will be used for buttons, links, and highlights on your portfolio.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setData({ ...data, theme: theme.id })}
              className={`relative flex items-center p-4 rounded-lg border-2 transition-all ${
                data.theme === theme.id
                  ? "border-white bg-gray-800"
                  : "border-gray-700 bg-gray-800/50 hover:bg-gray-800"
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${theme.color} mr-3 shadow-lg`}></div>
              <span className="text-gray-200 font-medium">{theme.name}</span>
              {data.theme === theme.id && (
                <div className="absolute top-2 right-2 text-white">
                  <FiCheck />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Choose a Portfolio Layout</h3>
        <p className="text-gray-400 mb-6 text-sm">
          Select a fundamental structure for your portfolio sections.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setData({ ...data, layoutStyle: 'classic' })}
            className={`relative p-4 rounded-lg border-2 transition-all text-left ${
              data.layoutStyle === 'classic'
                ? "border-white bg-gray-800"
                : "border-gray-700 bg-gray-800/50 hover:bg-gray-800"
            }`}
          >
            <span className="font-medium text-white">Classic Grid</span>
            <p className="text-xs text-gray-400 mt-1">Two-column project display. Standard feel.</p>
            {data.layoutStyle === 'classic' && (
              <div className="absolute top-2 right-2 text-white">
                <FiCheck />
              </div>
            )}
          </button>

          <button
            onClick={() => setData({ ...data, layoutStyle: 'minimal' })}
            className={`relative p-4 rounded-lg border-2 transition-all text-left ${
              data.layoutStyle === 'minimal'
                ? "border-white bg-gray-800"
                : "border-gray-700 bg-gray-800/50 hover:bg-gray-800"
            }`}
          >
            <span className="font-medium text-white">Minimal Stack</span>
            <p className="text-xs text-gray-400 mt-1">Single-column, resume-focused layout. Simple and elegant.</p>
            {data.layoutStyle === 'minimal' && (
              <div className="absolute top-2 right-2 text-white">
                <FiCheck />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}