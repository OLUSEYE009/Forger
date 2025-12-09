/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiExternalLink, FiCode, FiMail, FiBriefcase, FiBookOpen } from "react-icons/fi"; 
import Link from "next/link";
import { useParams } from "next/navigation";

// THEME CONFIGURATION
const themeClasses: Record<string, { primary: string, bg: string, text: string, border: string }> = {
  indigo: { primary: "text-indigo-500", bg: "bg-indigo-500", text: "text-indigo-400", border: "hover:border-indigo-500" },
  emerald: { primary: "text-emerald-500", bg: "bg-emerald-500", text: "text-emerald-400", border: "hover:border-emerald-500" },
  rose: { primary: "text-rose-500", bg: "bg-rose-500", text: "text-rose-400", border: "hover:border-rose-500" },
  amber: { primary: "text-amber-500", bg: "bg-amber-500", text: "text-amber-400", border: "hover:border-amber-500" },
  blue: { primary: "text-blue-500", bg: "bg-blue-500", text: "text-blue-400", border: "hover:border-blue-500" },
};


const renderDescription = (text: string) => (
    <ul className="list-disc list-inside space-y-1 text-gray-400">
        {text.split('\n').map((line, index) => (
            line.trim() && <li key={index}>{line.trim()}</li>
        ))}
    </ul>
);

export default function PortfolioView() {
  const params = useParams();
  const email = decodeURIComponent(params.email as string);
  
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = `portfolio-${email}`;
    const savedData = localStorage.getItem(key);
    
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    setLoading(false);
  }, [email]);

  const currentTheme = data && data.theme && themeClasses[data.theme] ? themeClasses[data.theme] : themeClasses.indigo;
  const isMinimalLayout = data?.layoutStyle === 'minimal'; 
  
  const bodyBgClass = 'bg-gray-900'; 
  const contentBgClass = 'bg-gray-800/50';

  if (loading) {
    return (
      <div className={`min-h-screen ${bodyBgClass} flex items-center justify-center`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2`}></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`min-h-screen ${bodyBgClass} flex flex-col items-center justify-center text-white px-4 text-center`}>
        <h1 className="text-4xl font-bold mb-4">404: Portfolio Not Found</h1>
        <p className="text-gray-400 mb-8">
          We couldn&apos;t find a portfolio for <strong>{email}</strong> on this device.
        </p>
        <Link 
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bodyBgClass} text-gray-100 font-sans selection:${currentTheme.bg} selection:text-white`}>
      
      <title>{data.seoTitle || `${data.fullName} Portfolio`}</title>
      
      {/* --- Hero Section --- */}
      <header className={`relative pt-24 pb-32 overflow-hidden ${contentBgClass}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
           <div className={`absolute top-10 right-10 w-72 h-72 ${currentTheme.bg} rounded-full mix-blend-multiply filter blur-3xl animate-pulse`}></div>
           <div className="absolute top-10 left-10 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            {data.fullName}
          </h1>
          <p className={`text-xl md:text-2xl font-medium mb-8 ${currentTheme.primary}`}>
            {data.headline}
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {data.bio}
          </p>

          <div className="flex justify-center gap-6 mt-10">
            {data.socials.github && (
              <SocialLink href={data.socials.github} icon={FiGithub} label="GitHub" />
            )}
            {data.socials.linkedin && (
              <SocialLink href={data.socials.linkedin} icon={FiLinkedin} label="LinkedIn" />
            )}
            {data.socials.twitter && (
              <SocialLink href={data.socials.twitter} icon={FiTwitter} label="Twitter" />
            )}
            {data.socials.website && (
              <SocialLink href={data.socials.website} icon={FiGlobe} label="Website" />
            )}
            <a 
              href={`mailto:${email}`} 
              className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all hover:scale-110"
              title="Send Email"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>
      
      {/* 💥 FIX APPLIED HERE: The gap-12 is now correctly placed within the main grid container. */}
      <main className="py-16">
        <div className={`max-w-5xl mx-auto px-6 ${isMinimalLayout ? 'space-y-16' : 'grid grid-cols-1 md:grid-cols-3 gap-12'}`}>

          {/* LEFT SIDEBAR (md:col-span-1 - Only shown in Classic Layout) */}
          {!isMinimalLayout && (
            <div className="space-y-12">
              
              {/* SKILLS SECTION */}
              {data.skills.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FiCode className={currentTheme.primary} />
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className={`px-4 py-2 ${contentBgClass} border border-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-colors cursor-default ${currentTheme.border} hover:text-white`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* EDUCATION SECTION */}
              {data.education.length > 0 && (
                  <section>
                      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                          <FiBookOpen className={currentTheme.primary} />
                          Education
                      </h2>
                      <div className="space-y-6">
                          {data.education.map((edu) => (
                              <div key={edu.id}>
                                  <h3 className="font-semibold text-white">{edu.degree}</h3>
                                  <p className="text-sm text-gray-400">{edu.institution}</p>
                                  <p className={`text-xs mt-1 ${currentTheme.primary}`}>Graduation Date: {edu.graduationDate}</p>
                              </div>
                          ))}
                      </div>
                  </section>
              )}
            </div>
          )}
          
          {/* MAIN CONTENT (md:col-span-2 or Full Width) */}
          <div className={`space-y-16 ${isMinimalLayout ? 'md:col-span-3' : 'md:col-span-2'}`}>
            
            {/* --- EXPERIENCE SECTION --- */}
            {data.experience.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <FiBriefcase className={currentTheme.primary} />
                        Work Experience
                    </h2>
                    <div className="space-y-8 border-l border-gray-700 pl-4">
                        {data.experience.map((exp) => (
                            <div key={exp.id} className="relative">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-5 top-0 w-3 h-3 rounded-full ${currentTheme.bg}`}></div>
                                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                                <p className="text-lg text-gray-300">{exp.company}</p>
                                <p className="text-sm text-gray-500 mb-3">{exp.startDate} – {exp.endDate}</p>
                                {renderDescription(exp.description)}
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
            {/* --- PROJECTS SECTION --- */}
            {data.projects.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold text-white mb-10">Featured Projects</h2>
                    
                    {/* Project Grid: Uses 1 column for minimal, 2 columns for classic */}
                    <div className={`grid gap-8 ${isMinimalLayout ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                        {data.projects.map((project) => (
                            <div 
                                key={project.id} 
                                className={`group ${contentBgClass} rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-2xl flex flex-col ${currentTheme.border}`}
                            >
                                <div className="p-8 flex-grow">
                                    <h3 className={`text-2xl font-bold text-white mb-3 group-hover:${currentTheme.text} transition-colors`}>
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                </div>
                                <div className={`px-8 py-6 ${bodyBgClass}/50 border-t border-gray-700 flex items-center justify-between`}>
                                    <div className="flex gap-4">
                                      {project.repo && (
                                        <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                          <FiGithub className="w-4 h-4" /><span>Code</span>
                                        </a>
                                      )}
                                      {project.url && (
                                        <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                          <FiExternalLink className="w-4 h-4" /><span>Live Demo</span>
                                        </a>
                                      )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* SKILLS & EDUCATION (Only shown in Minimal Layout - Full width) */}
            {isMinimalLayout && (
              <>
                  {data.skills.length > 0 && (
                      <section>
                          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                              <FiCode className={currentTheme.primary} />
                              Technical Skills
                          </h2>
                          <div className="flex flex-wrap gap-3">
                            {data.skills.map((skill, index) => (
                                <span key={index} className={`px-4 py-2 ${contentBgClass} border border-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-colors cursor-default ${currentTheme.border} hover:text-white`}>
                                    {skill}
                                </span>
                            ))}
                          </div>
                      </section>
                  )}
                   {data.education.length > 0 && (
                      <section>
                          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                              <FiBookOpen className={currentTheme.primary} />
                              Education
                          </h2>
                          <div className="space-y-6">
                              {data.education.map((edu) => (
                                  <div key={edu.id}>
                                      <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                                      <p className="text-lg text-gray-400">{edu.institution}</p>
                                      <p className={`text-sm mt-1 ${currentTheme.primary}`}>Graduation Date: {edu.graduationDate}</p>
                                  </div>
                              ))}
                          </div>
                      </section>
                  )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className={`py-12 text-center text-gray-500 text-sm border-t border-gray-800 ${contentBgClass}`}>
        <p>Built with <span className="text-white font-semibold">Forger</span></p>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all hover:scale-110"
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}