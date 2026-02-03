"use client";

import { useState } from "react";

interface CVFormProps {
  onBack: () => void;
  onSubmit: (data: CVData) => void;
}

export interface CVData {
  // Personal Info
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  
  // Profile Summary
  summary: string;
  
  // Education
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  
  // Experience
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  
  // Skills
  skills: string[];
  
  // Languages
  languages: Array<{
    name: string;
    level: string;
  }>;
}

export default function CVForm({ onBack, onSubmit }: CVFormProps) {
  const [formData, setFormData] = useState<CVData>({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    education: [{ school: "", degree: "", field: "", startDate: "", endDate: "", description: "" }],
    experience: [{ company: "", position: "", location: "", startDate: "", endDate: "", description: "" }],
    skills: [""],
    languages: [{ name: "", level: "" }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: "", degree: "", field: "", startDate: "", endDate: "", description: "" }]
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", position: "", location: "", startDate: "", endDate: "", description: "" }]
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: newExperience });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const removeSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const addLanguage = () => {
    setFormData({ ...formData, languages: [...formData.languages, { name: "", level: "" }] });
  };

  const removeLanguage = (index: number) => {
    const newLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: newLanguages });
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-gray-200 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Create Your CV</h2>
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Back
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+62 812-3456-7890"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jakarta, Indonesia"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website/Portfolio
                </label>
                <input 
                  type="url" 
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input 
                  type="url" 
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <input 
                  type="url" 
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/johndoe"
                />
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Profile Summary</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Summary <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={4}
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description about yourself and your professional experience..."
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Education</h3>
              <button 
                type="button"
                onClick={addEducation}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
              >
                + Add Education
              </button>
            </div>
            
            {formData.education.map((edu, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School/University</label>
                    <input 
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].school = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="University Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input 
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].degree = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Bachelor's Degree"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                  <input 
                    type="text"
                    value={edu.field}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].field = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Computer Science"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input 
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].startDate = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input 
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].endDate = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={2}
                    value={edu.description}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].description = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Achievements, GPA, relevant coursework..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Work Experience</h3>
              <button 
                type="button"
                onClick={addExperience}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
              >
                + Add Experience
              </button>
            </div>
            
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input 
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].company = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input 
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].position = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text"
                    value={exp.location}
                    onChange={(e) => {
                      const newExperience = [...formData.experience];
                      newExperience[index].location = e.target.value;
                      setFormData({ ...formData, experience: newExperience });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jakarta, Indonesia"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input 
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].startDate = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input 
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].endDate = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Leave empty if current"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={3}
                    value={exp.description}
                    onChange={(e) => {
                      const newExperience = [...formData.experience];
                      newExperience[index].description = e.target.value;
                      setFormData({ ...formData, experience: newExperience });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
              <button 
                type="button"
                onClick={addSkill}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
              >
                + Add Skill
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...formData.skills];
                      newSkills[index] = e.target.value;
                      setFormData({ ...formData, skills: newSkills });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Languages</h3>
              <button 
                type="button"
                onClick={addLanguage}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
              >
                + Add Language
              </button>
            </div>
            
            {formData.languages.map((lang, index) => (
              <div key={index} className="flex gap-3">
                <input 
                  type="text"
                  value={lang.name}
                  onChange={(e) => {
                    const newLanguages = [...formData.languages];
                    newLanguages[index].name = e.target.value;
                    setFormData({ ...formData, languages: newLanguages });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Language name"
                />
                <select
                  value={lang.level}
                  onChange={(e) => {
                    const newLanguages = [...formData.languages];
                    newLanguages[index].level = e.target.value;
                    setFormData({ ...formData, languages: newLanguages });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Level</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                {formData.languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Generate CV
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
