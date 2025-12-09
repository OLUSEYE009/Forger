"use client";

import { PortfolioData } from "@/types/portfolio";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";

interface Props {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ProfileForm({ data, setData }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          placeholder="Your Name"
        />
      </div>
      <div>
        <label htmlFor="headline" className="block text-sm font-medium text-gray-300 mb-1">
          Headline
        </label>
        <Input
          id="headline"
          name="headline"
          value={data.headline}
          onChange={handleChange}
          placeholder="e.g., Full-Stack Developer"
        />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
          Biography
        </label>
        <Textarea
          id="bio"
          name="bio"
          value={data.bio}
          onChange={handleChange}
          placeholder="A short summary about your experience and skills..."
        />
      </div>
    </form>
  );
}