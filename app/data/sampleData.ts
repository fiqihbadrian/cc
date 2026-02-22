import { CVData } from "../components/CVForm";

export const sampleCVData: CVData = {
  fullName: "John Anderson",
  title: "Senior Full Stack Developer",
  email: "john.anderson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://johnanderson.dev",
  linkedin: "https://linkedin.com/in/johnanderson",
  github: "https://github.com/johnanderson",
  photo: "",
  template: "modern",
  summary: "Full Stack Developer with 5+ years building scalable web applications using React, Node.js, and TypeScript. Passionate about clean code and user-centric solutions.",
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      description: "• Led microservices architecture for 1M+ users\n• Improved performance by 40% through optimization\n• Mentored 5 junior developers"
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "2020-03",
      endDate: "2021-12",
      description: "• Built React dashboard and Node.js APIs\n• Integrated payment systems (Stripe, PayPal)\n• Implemented responsive UI/UX"
    }
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      description: "GPA: 3.8/4.0 • Dean's List • President of CS Club"
    }
  ],
  skills: [
    "JavaScript/TypeScript",
    "React & Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Git"
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Intermediate" }
  ]
};

export const sampleCVData2: CVData = {
  fullName: "Sarah Chen",
  title: "UX/UI Designer",
  email: "sarah.chen@example.com",
  phone: "+1 (555) 987-6543",
  location: "Seattle, WA",
  website: "https://sarahchen.design",
  linkedin: "https://linkedin.com/in/sarahchen",
  github: "https://github.com/sarahchen",
  photo: "",
  template: "classic",
  summary: "UX/UI Designer with 4+ years creating intuitive digital products. Skilled in user research, prototyping, and design systems. Passionate about accessible design.",
  experience: [
    {
      company: "DesignHub Agency",
      position: "Senior UX/UI Designer",
      location: "Seattle, WA",
      startDate: "2021-06",
      endDate: "",
      description: "• Lead designer for 10+ client projects\n• Created design systems and component libraries\n• Conducted user research and usability testing"
    },
    {
      company: "ProductCo",
      position: "UX/UI Designer",
      location: "Remote",
      startDate: "2020-02",
      endDate: "2021-05",
      description: "• Designed mobile app for iOS and Android\n• Increased engagement by 35% through redesign\n• Created interactive prototypes in Figma"
    }
  ],
  education: [
    {
      school: "Rhode Island School of Design",
      degree: "Bachelor of Fine Arts in Graphic Design",
      field: "Graphic Design",
      startDate: "2016-09",
      endDate: "2020-05",
      description: "Focus: Digital Media and Interaction Design"
    }
  ],
  skills: [
    "Figma",
    "Adobe Creative Suite",
    "Prototyping",
    "User Research",
    "Design Systems",
    "HTML/CSS"
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Mandarin", level: "Fluent" }
  ]
};
