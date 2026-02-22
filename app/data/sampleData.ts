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
  summary: "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. Proficient in React, Node.js, TypeScript, and cloud technologies. Passionate about creating efficient, user-friendly solutions and mentoring junior developers. Strong problem-solving skills and ability to work in fast-paced, agile environments.",
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      description: "• Led development of microservices architecture serving 1M+ users\n• Improved application performance by 40% through code optimization\n• Mentored team of 5 junior developers\n• Implemented CI/CD pipelines reducing deployment time by 60%"
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "2020-03",
      endDate: "2021-12",
      description: "• Developed and maintained React-based dashboard application\n• Built RESTful APIs using Node.js and Express\n• Integrated third-party payment systems (Stripe, PayPal)\n• Collaborated with design team to implement responsive UI/UX"
    },
    {
      company: "WebSolutions Co.",
      position: "Junior Developer",
      location: "New York, NY",
      startDate: "2019-06",
      endDate: "2020-02",
      description: "• Assisted in development of e-commerce platform\n• Fixed bugs and implemented new features\n• Participated in code reviews and agile ceremonies\n• Learned best practices in software development"
    }
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      description: "GPA: 3.8/4.0\n• Dean's List all semesters\n• President of Computer Science Club\n• Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems"
    },
    {
      school: "Tech Bootcamp",
      degree: "Full Stack Web Development Certificate",
      field: "Web Development",
      startDate: "2019-01",
      endDate: "2019-04",
      description: "Intensive 12-week program covering modern web development technologies including React, Node.js, MongoDB, and deployment strategies."
    }
  ],
  skills: [
    "JavaScript/TypeScript",
    "React & Next.js",
    "Node.js & Express",
    "Python",
    "PostgreSQL & MongoDB",
    "AWS & Docker",
    "Git & CI/CD",
    "REST APIs",
    "GraphQL",
    "Tailwind CSS"
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Intermediate" },
    { name: "Mandarin", level: "Basic" }
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
  summary: "Creative UX/UI Designer with 4+ years of experience designing intuitive and engaging digital products. Skilled in user research, wireframing, prototyping, and collaborating with cross-functional teams. Passionate about creating accessible and inclusive design solutions that delight users.",
  experience: [
    {
      company: "DesignHub Agency",
      position: "Senior UX/UI Designer",
      location: "Seattle, WA",
      startDate: "2021-06",
      endDate: "",
      description: "• Lead designer for 10+ client projects across various industries\n• Conducted user research and usability testing sessions\n• Created design systems and component libraries\n• Collaborated with developers to ensure design implementation"
    },
    {
      company: "ProductCo",
      position: "UX/UI Designer",
      location: "Remote",
      startDate: "2020-02",
      endDate: "2021-05",
      description: "• Designed mobile app interface for iOS and Android\n• Increased user engagement by 35% through redesign\n• Created interactive prototypes using Figma\n• Participated in design sprints and brainstorming sessions"
    }
  ],
  education: [
    {
      school: "Rhode Island School of Design",
      degree: "Bachelor of Fine Arts",
      field: "Graphic Design",
      startDate: "2016-09",
      endDate: "2020-05",
      description: "Concentration in Digital Media and Interaction Design\n• Portfolio recognized in AIGA Student Competition\n• Teaching Assistant for Intro to Digital Design"
    }
  ],
  skills: [
    "Figma",
    "Adobe Creative Suite",
    "Sketch",
    "Prototyping",
    "User Research",
    "Wireframing",
    "Design Systems",
    "HTML/CSS",
    "Accessibility",
    "Agile/Scrum"
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Mandarin", level: "Fluent" }
  ]
};
