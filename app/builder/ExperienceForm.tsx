"use client";

import { useState } from "react";
import { PortfolioData, Experience, Education } from "@/types/portfolio";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import { FiPlus, FiTrash2, FiBriefcase, FiBookOpen } from "react-icons/fi";

interface Props {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const ItemCard = ({ title, subtitle, dates, onRemove }: {
    title: string;
    subtitle: string;
    dates: string;
    onRemove: () => void;
}) => (
    <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
        <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{subtitle}</p>
            <p className="text-xs text-gray-500 mt-1">{dates}</p>
        </div>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 p-1">
            <FiTrash2 className="h-5 w-5" />
        </button>
    </div>
);

export default function ExperienceForm({ data, setData }: Props) {
    const [showExpForm, setShowExpForm] = useState(false);
    const [showEduForm, setShowEduForm] = useState(false);
    const [newExp, setNewExp] = useState<Omit<Experience, "id">>({ title: "", company: "", startDate: "", endDate: "", description: "" });
    const [newEdu, setNewEdu] = useState<Omit<Education, "id">>({ degree: "", institution: "", graduationDate: "" });


    const handleAddExperience = (e: React.FormEvent) => {
        e.preventDefault();
        const expToAdd: Experience = { ...newExp, id: crypto.randomUUID() };
        setData(prev => ({...prev, experience: [...(prev.experience || []), expToAdd] }));
        setNewExp({ title: "", company: "", startDate: "", endDate: "", description: "" });
        setShowExpForm(false);
    };

    const handleRemoveExperience = (id: string) => {
        setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    };


    const handleAddEducation = (e: React.FormEvent) => {
        e.preventDefault();
        const eduToAdd: Education = { ...newEdu, id: crypto.randomUUID() };
        setData(prev => ({ ...prev, education: [...(prev.education || []), eduToAdd] }));
        setNewEdu({ degree: "", institution: "", graduationDate: "" });
        setShowEduForm(false);
    };

    const handleRemoveEducation = (id: string) => {
        setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
    };

    return (
        <div className="space-y-10">
            {/* WORK EXPERIENCE */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FiBriefcase /> Work Experience</h2>
                <div className="space-y-3 mb-6">
                    {data.experience?.map(exp => (
                        <ItemCard
                            key={exp.id}
                            title={exp.title}
                            subtitle={exp.company}
                            dates={`${exp.startDate} - ${exp.endDate}`}
                            onRemove={() => handleRemoveExperience(exp.id)}
                        />
                    ))}
                    {data.experience?.length === 0 && <p className="text-gray-400 text-sm">No experience added.</p>}
                </div>
                
                {showExpForm ? (
                    <form onSubmit={handleAddExperience} className="space-y-3 bg-gray-800 p-4 rounded-lg">
                        <Input name="title" value={newExp.title} onChange={(e) => setNewExp({...newExp, title: e.target.value})} placeholder="Job Title" required />
                        <Input name="company" value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} placeholder="Company Name" required />
                        <div className="flex gap-2">
                            <Input name="startDate" value={newExp.startDate} onChange={(e) => setNewExp({...newExp, startDate: e.target.value})} placeholder="Start Date (e.g., 2020)" required />
                            <Input name="endDate" value={newExp.endDate} onChange={(e) => setNewExp({...newExp, endDate: e.target.value})} placeholder="End Date (e.g., 2024 or Present)" required />
                        </div>
                        <Textarea name="description" value={newExp.description} onChange={(e) => setNewExp({...newExp, description: e.target.value})} placeholder="Job description (use bullet points)" />
                        <div className="flex gap-2 pt-2">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Save</button>
                            <button type="button" onClick={() => setShowExpForm(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <button onClick={() => setShowExpForm(true)} className="flex items-center text-sm text-indigo-400 hover:text-indigo-300">
                        <FiPlus className="h-4 w-4 mr-1" /> Add Experience
                    </button>
                )}
            </div>

            {/* EDUCATION */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FiBookOpen /> Education</h2>
                <div className="space-y-3 mb-6">
                    {data.education?.map(edu => (
                        <ItemCard
                            key={edu.id}
                            title={edu.degree}
                            subtitle={edu.institution}
                            dates={edu.graduationDate}
                            onRemove={() => handleRemoveEducation(edu.id)}
                        />
                    ))}
                    {data.education?.length === 0 && <p className="text-gray-400 text-sm">No education added.</p>}
                </div>
                
                {showEduForm ? (
                    <form onSubmit={handleAddEducation} className="space-y-3 bg-gray-800 p-4 rounded-lg">
                        <Input name="degree" value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} placeholder="Degree/Certificate" required />
                        <Input name="institution" value={newEdu.institution} onChange={(e) => setNewEdu({...newEdu, institution: e.target.value})} placeholder="Institution Name" required />
                        <Input name="graduationDate" value={newEdu.graduationDate} onChange={(e) => setNewEdu({...newEdu, graduationDate: e.target.value})} placeholder="Graduation Date (e.g., 2020)" required />
                        <div className="flex gap-2 pt-2">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Save</button>
                            <button type="button" onClick={() => setShowEduForm(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <button onClick={() => setShowEduForm(true)} className="flex items-center text-sm text-indigo-400 hover:text-indigo-300">
                        <FiPlus className="h-4 w-4 mr-1" /> Add Education
                    </button>
                )}
            </div>
        </div>
    );
}