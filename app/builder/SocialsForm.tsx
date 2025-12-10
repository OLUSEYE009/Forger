"use client";

import { PortfolioData } from "@/types/portfolio";
import Input from "@/components/forms/Input";
import { FiGithub, FiLinkedin, FiX, FiGlobe } from "react-icons/fi";

interface Props {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function SocialsForm({ data, setData }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <form className="space-y-6">
      <SocialInput
        name="github"
        label="GitHub"
        icon={FiGithub}
        value={data.socials.github}
        onChange={handleChange}
        placeholder="https://github.com/your-username"
      />
      <SocialInput
        name="linkedin"
        label="LinkedIn"
        icon={FiLinkedin}
        value={data.socials.linkedin}
        onChange={handleChange}
        placeholder="https://linkedin.com/in/your-username"
      />
      <SocialInput
        name="twitter"
        label="Twitter/X"
        icon={FiX}
        value={data.socials.twitter}
        onChange={handleChange}
        placeholder="https://x.com/your-username"
      />
      <SocialInput
        name="website"
        label="Personal Website"
        icon={FiGlobe}
        value={data.socials.website}
        onChange={handleChange}
        placeholder="https://your-website.com"
      />
    </form>
  );
}

// Helper component for styled social inputs
function SocialInput({
  name,
  label,
  icon: Icon,
  ...props
}: {
  name: string;
  label: string;
  icon: React.ElementType;
} & React.ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="pl-10">
        <Input id={name} name={name} {...props} />
        </div>
      </div>
    </div>
  );
}