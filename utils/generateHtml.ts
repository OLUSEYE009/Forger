import { PortfolioData } from "@/types/portfolio";

export const generatePortfolioHTML = (data: PortfolioData) => {
  
  const themeColors: Record<string, string> = {
    indigo: '#6366f1',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
    blue: '#3b82f6',
  };

  const primaryColor = themeColors[data.theme] || '#6366f1';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.fullName} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '${primaryColor}',
            }
          }
        }
      }
    </script>
    <style>
      body { background-color: #111827; color: #f3f4f6; }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="font-sans antialiased">

    <header class="relative pt-24 pb-32 overflow-hidden text-center px-6">
        <div class="max-w-4xl mx-auto relative z-10">
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
                ${data.fullName}
            </h1>
            <p class="text-xl md:text-2xl text-primary font-medium mb-8">
                ${data.headline}
            </p>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                ${data.bio}
            </p>
            
            <div class="flex justify-center gap-6 mt-10 text-2xl">
                ${data.socials.github ? `<a href="${data.socials.github}" class="text-gray-400 hover:text-primary"><i class="fab fa-github"></i></a>` : ''}
                ${data.socials.linkedin ? `<a href="${data.socials.linkedin}" class="text-gray-400 hover:text-primary"><i class="fab fa-linkedin"></i></a>` : ''}
                ${data.socials.twitter ? `<a href="${data.socials.twitter}" class="text-gray-400 hover:text-primary"><i class="fab fa-twitter"></i></a>` : ''}
            </div>
        </div>
    </header>

    ${data.skills.length > 0 ? `
    <section class="py-12 bg-gray-800/50">
        <div class="max-w-5xl mx-auto px-6 text-center">
            <h2 class="text-2xl font-bold text-white mb-8">Technical Skills</h2>
            <div class="flex flex-wrap justify-center gap-3">
                ${data.skills.map(skill => `
                    <span class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm font-medium">
                        ${skill}
                    </span>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <section class="py-24">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${data.projects.map(project => `
                <div class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary transition-all p-8 flex flex-col">
                    <h3 class="text-2xl font-bold text-white mb-3">${project.title}</h3>
                    <p class="text-gray-400 mb-6 flex-grow">${project.description}</p>
                    <div class="flex gap-4 mt-auto pt-6 border-t border-gray-700">
                        ${project.repo ? `<a href="${project.repo}" class="text-sm text-primary hover:underline">View Code</a>` : ''}
                        ${project.url ? `<a href="${project.url}" class="text-sm text-primary hover:underline">Live Demo</a>` : ''}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <footer class="py-12 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>Built with <abbr title="Forger-Portfolio Builder">Forger</abbr></p>
    </footer>

</body>
</html>`;
};