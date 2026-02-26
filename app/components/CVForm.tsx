"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input, Textarea, Label } from "./ui/input";
import { sampleCVData } from "../data/sampleData";
import { CVTemplate, templates } from "../types/templates";

interface CVFormProps {
  onBack: () => void;
  onSubmit: (data: CVData) => void;
  initialData?: CVData;
  onAutoSave?: (data: CVData) => void;
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
  photo?: string; // Optional base64 image
  
  // Profile Summary
  summary: string;
  
  // Template
  template: CVTemplate;
  
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

export default function CVForm({ onBack, onSubmit, initialData, onAutoSave }: CVFormProps) {
  const [formData, setFormData] = useState<CVData>(initialData || {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    photo: "",
    summary: "",
    template: "modern",
    education: [{ school: "", degree: "", field: "", startDate: "", endDate: "", description: "" }],
    experience: [{ company: "", position: "", location: "", startDate: "", endDate: "", description: "" }],
    skills: [""],
    languages: [{ name: "", level: "" }]
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isOverOnePage, setIsOverOnePage] = useState(false);
  // Auto-save draft every 2 seconds after changes
  useEffect(() => {
    if (onAutoSave) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        onAutoSave(formData);
        setIsSaving(false);
        setLastSaved(new Date());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formData, onAutoSave]);

  // Estimate content height to detect if over 1 page
  useEffect(() => {
    const estimateHeight = () => {
      // Approximate heights (in pixels at 96 DPI)
      const A4_HEIGHT = 1123; // 297mm
      const HEADER_HEIGHT = 200;
      const SECTION_SPACING = 40;
      
      let totalHeight = HEADER_HEIGHT;
      
      // Summary
      if (formData.summary) {
        totalHeight += 100 + Math.ceil(formData.summary.length / 100) * 20;
      }
      
      // Experience
      formData.experience.forEach(exp => {
        if (exp.company || exp.position) {
          totalHeight += 80 + Math.ceil((exp.description?.length || 0) / 80) * 18;
        }
      });
      
      // Education
      formData.education.forEach(edu => {
        if (edu.school || edu.degree) {
          totalHeight += 70 + Math.ceil((edu.description?.length || 0) / 80) * 18;
        }
      });
      
      // Skills
      if (formData.skills.some(s => s.trim())) {
        totalHeight += 60 + Math.ceil(formData.skills.length / 5) * 30;
      }
      
      // Languages
      if (formData.languages.some(l => l.name)) {
        totalHeight += 60 + Math.ceil(formData.languages.length / 3) * 40;
      }
      
      totalHeight += SECTION_SPACING * 5; // Between sections
      
      setIsOverOnePage(totalHeight > A4_HEIGHT);
    };
    
    estimateHeight();
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if CV is over one page
    if (isOverOnePage) {
      const confirmed = confirm(
        "Warning: Your CV content exceeds 1 page!\n\n" +
        "Recruiters prefer 1-page CVs for better readability.\n\n" +
        "Recommendations:\n" +
        "• Shorten descriptions\n" +
        "• Remove less relevant information\n" +
        "• Use bullet points instead of paragraphs\n\n" +
        "Do you want to continue to preview anyway?"
      );
      
      if (!confirmed) {
        return; // Don't submit if user wants to edit
      }
    }
    
    onSubmit(formData);
  };

  const handleFillExample = () => {
    if (confirm("This will replace all current data with example data. Continue?")) {
      setFormData(sampleCVData);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, photo: "" });
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
    <div className="w-full max-w-4xl">
      {/* Auto-save indicator */}
      <div className="mb-4 text-center min-h-[40px] flex items-center justify-center">
        {isSaving && (
          <span className="inline-block bg-yellow-100 border-2 border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg text-sm font-semibold animate-pulse">
            <i className="fas fa-floppy-disk mr-1"></i> Saving draft...
          </span>
        )}
        {!isSaving && lastSaved && (
          <span className="inline-block bg-green-100 border-2 border-green-400 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
            <i className="fas fa-check mr-1"></i> Saved at {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Page overflow warning */}
      {isOverOnePage && (
        <div className="mb-4 bg-red-50 border-2 border-red-500 rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.5)]">
          <div className="flex items-start gap-3">
            <i className="fas fa-triangle-exclamation text-2xl text-red-600"></i>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Content Exceeds 1 Page!</h3>
              <p className="text-sm text-red-800 mb-2">
                Your CV is estimated to be more than 1 page. Most recruiters prefer concise 1-page CVs.
              </p>
              <div className="text-xs text-red-700">
                <strong>Tips to reduce:</strong>
                <ul className="list-disc ml-4 mt-1 space-y-0.5">
                  <li>Shorten experience/education descriptions</li>
                  <li>Remove older or less relevant positions</li>
                  <li>Use bullet points instead of long paragraphs</li>
                  <li>Keep summary brief and impactful (2-3 sentences)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              <Button 
                type="button" 
                onClick={handleFillExample} 
                variant="ghost" 
                size="sm"
                className="text-sm hover:bg-yellow-50"
                title="Fill all fields with example data"
              >
                Fill with Example
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
              />
              <Input
                label="Professional Title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+62 812-3456-7890"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Jakarta, Indonesia"
              />
              <Input
                label="Website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="LinkedIn"
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
              />
              <Input
                label="GitHub"
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/yourusername"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <Label>Profile Photo (Optional)</Label>
              <div className="flex items-start gap-4">
                {formData.photo ? (
                  <div className="relative">
                    <img 
                      src={formData.photo} 
                      alt="Profile" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <i className="fas fa-camera text-gray-400 text-4xl"></i>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-block px-4 py-2 bg-white border-2 border-black rounded-lg font-semibold cursor-pointer hover:bg-gray-50 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {formData.photo ? "Change Photo" : "Upload Photo"}
                  </label>
                  <p className="text-xs text-gray-600 mt-2">
                    Max size: 2MB • Formats: JPG, PNG, GIF
                  </p>
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-3">
              <Label>Choose CV Template</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, template: template.id })}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                      formData.template === template.id
                        ? "border-black bg-yellow-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "border-gray-300 bg-white hover:border-black"
                    }`}
                  >
                    <div className="text-2xl mb-2"><i className={template.preview}></i></div>
                    <div className="text-sm font-semibold mb-1">{template.name}</div>
                    <div className="text-xs text-gray-600">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              label="Profile Summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief description about yourself and your professional background..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Work Experience</CardTitle>
              <Button type="button" onClick={addExperience} variant="outline" size="sm">
                + Add Experience
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4 space-y-4 relative">
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].company = e.target.value;
                      setFormData({ ...formData, experience: newExp });
                    }}
                    placeholder="Company Name"
                  />
                  <Input
                    label="Position"
                    type="text"
                    value={exp.position}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].position = e.target.value;
                      setFormData({ ...formData, experience: newExp });
                    }}
                    placeholder="Job Title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Location"
                    type="text"
                    value={exp.location}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].location = e.target.value;
                      setFormData({ ...formData, experience: newExp });
                    }}
                    placeholder="City, Country"
                  />
                  <Input
                    label="Start Date"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].startDate = e.target.value;
                      setFormData({ ...formData, experience: newExp });
                    }}
                  />
                  <Input
                    label="End Date"
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].endDate = e.target.value;
                      setFormData({ ...formData, experience: newExp });
                    }}
                  />
                </div>

                <Textarea
                  label="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].description = e.target.value;
                    setFormData({ ...formData, experience: newExp });
                  }}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Education</CardTitle>
              <Button type="button" onClick={addEducation} variant="outline" size="sm">
                + Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.education.map((edu, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4 space-y-4 relative">
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="School/University"
                    type="text"
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].school = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                    placeholder="University Name"
                  />
                  <Input
                    label="Degree"
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].degree = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Field of Study"
                    type="text"
                    value={edu.field}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].field = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                    placeholder="Computer Science"
                  />
                  <Input
                    label="Start Date"
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].startDate = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                  />
                  <Input
                    label="End Date"
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].endDate = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                  />
                </div>

                <Textarea
                  label="Description"
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].description = e.target.value;
                    setFormData({ ...formData, education: newEdu });
                  }}
                  placeholder="Notable achievements, activities, or relevant coursework..."
                  rows={3}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Skills</CardTitle>
              <Button type="button" onClick={addSkill} variant="outline" size="sm">
                + Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...formData.skills];
                      newSkills[index] = e.target.value;
                      setFormData({ ...formData, skills: newSkills });
                    }}
                    placeholder="e.g., JavaScript"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Languages</CardTitle>
              <Button type="button" onClick={addLanguage} variant="outline" size="sm">
                + Add Language
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.languages.map((lang, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Input
                      label="Language"
                      type="text"
                      value={lang.name}
                      onChange={(e) => {
                        const newLangs = [...formData.languages];
                        newLangs[index].name = e.target.value;
                        setFormData({ ...formData, languages: newLangs });
                      }}
                      placeholder="e.g., English"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Level"
                      type="text"
                      value={lang.level}
                      onChange={(e) => {
                        const newLangs = [...formData.languages];
                        newLangs[index].level = e.target.value;
                        setFormData({ ...formData, languages: newLangs });
                      }}
                      placeholder="e.g., Native, Fluent, Intermediate"
                    />
                  </div>
                  {formData.languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2 pb-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="flex justify-between pt-5">
            <Button type="button" onClick={onBack} variant="outline">
              ← Back
            </Button>
            <Button type="submit">
              Preview CV →
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
