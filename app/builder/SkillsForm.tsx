"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import Input from "@/components/forms/Input";
import { FiPlus, FiX } from "react-icons/fi";

interface Props {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function SkillsForm({ data, setData }: Props) {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Add Skills
        </label>
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <Input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g., Python"
            className="flex-grow"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md shadow-lg flex items-center"
          >
            <FiPlus className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-3">Your Skills</h3>
        {data.skills.length === 0 ? (
          <p className="text-gray-400">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-gray-400 hover:text-red-400"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}