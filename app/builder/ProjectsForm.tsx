"use client";

import { useState } from "react";
import { PortfolioData, Project } from "@/types/portfolio";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Props {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}


const blankProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  url: "",
  repo: "",
};

export default function ProjectsForm({ data, setData }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState(blankProject);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProject(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const projectToAdd: Project = {
      ...newProject,
      id: crypto.randomUUID(), // Generate a unique ID
    };

    setData(prev => ({
      ...prev,
      projects: [...prev.projects, projectToAdd],
    }));

    setNewProject(blankProject); // Reset form
    setShowForm(false);
  };

  const handleRemoveProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      {/* List of Existing Projects */}
      <div className="space-y-4">
        {data.projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white">{project.title}</h3>
              <p className="text-sm text-gray-400 truncate max-w-md">{project.description}</p>
            </div>
            <button
              onClick={() => handleRemoveProject(project.id)}
              className="text-gray-400 hover:text-red-500 p-1"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        {data.projects.length === 0 && !showForm && (
          <p className="text-gray-400">No projects added yet.</p>
        )}
      </div>

      {/* Add New Project Button/Form */}
      {showForm ? (
        <form onSubmit={handleAddProject} className="space-y-4 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white">Add New Project</h3>
          <Input name="title" value={newProject.title} onChange={handleChange} placeholder="Project Title" required />
          <Textarea name="description" value={newProject.description} onChange={handleChange} placeholder="Project Description" required />
          <Input name="url" value={newProject.url} onChange={handleChange} placeholder="Live URL (https://...)" />
          <Input name="repo" value={newProject.repo} onChange={handleChange} placeholder="Repo URL (https://github.com/...)" />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
            >
              Save Project
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-secondary hover:bg-emerald-600 text-white px-4 py-2 rounded-md shadow-lg"
        >
          <FiPlus className="h-5 w-5 mr-1.5" />
          Add New Project
        </button>
      )}
    </div>
  );
}