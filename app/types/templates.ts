export type CVTemplate = "modern" | "classic" | "minimal" | "professional" | "ats";

export interface TemplateInfo {
  id: CVTemplate;
  name: string;
  description: string;
  preview: string;
}

export const templates: TemplateInfo[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Bold neobrutalism design",
    preview: "fas fa-paintbrush"
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional serif style",
    preview: "fas fa-scroll"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and spacious",
    preview: "fas fa-circle"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate gradient style",
    preview: "fas fa-briefcase"
  },
  {
    id: "ats",
    name: "ATS-Friendly",
    description: "Optimized for job systems",
    preview: "fas fa-robot"
  }
];
