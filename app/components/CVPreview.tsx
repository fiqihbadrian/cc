"use client";

import { useState } from "react";
import { CVData } from "./CVForm";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CVPreviewProps {
  data: CVData;
  onBack: () => void;
  onEdit: () => void;
}

type PaperSize = "a4" | "f4" | "letter" | "legal";

interface PaperSizeInfo {
  id: PaperSize;
  name: string;
  width: string;
  printSize: string;
}

const paperSizes: PaperSizeInfo[] = [
  { id: "a4", name: "A4 (210 × 297 mm)", width: "210mm", printSize: "A4" },
  { id: "f4", name: "F4 (215 × 330 mm)", width: "215mm", printSize: "215mm 330mm" },
  { id: "letter", name: "Letter (8.5 × 11 in)", width: "8.5in", printSize: "letter" },
  { id: "legal", name: "Legal (8.5 × 14 in)", width: "8.5in", printSize: "legal" }
];

export default function CVPreview({ data, onBack, onEdit }: CVPreviewProps) {
  const [paperSize, setPaperSize] = useState<PaperSize>("a4");

  const handleDownload = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const getPaperSizeClass = () => {
    const sizes = {
      a4: "max-w-[210mm]",
      f4: "max-w-[215mm]",
      letter: "max-w-[8.5in]",
      legal: "max-w-[8.5in]"
    };
    return sizes[paperSize];
  };

  const currentPaperSize = paperSizes.find(p => p.id === paperSize)!;

  // Render based on template
  const renderCVContent = () => {
    switch (data.template) {
      case "classic":
        return renderClassicTemplate();
      case "minimal":
        return renderMinimalTemplate();
      case "professional":
        return renderProfessionalTemplate();
      case "ats":
        return renderATSTemplate();
      case "modern":
      default:
        return renderModernTemplate();
    }
  };

  // Modern Template (Neobrutalism)
  const renderModernTemplate = () => (
    <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg cv-preview" id="cv-content">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b-4 border-gray-900">
        <div className="flex gap-6 items-start mb-4">
          {data.photo && (
            <img 
              src={data.photo} 
              alt={data.fullName}
              className="w-32 h-32 object-cover rounded-lg border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
              {data.fullName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">{data.title}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
          {data.email && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">✉️ Email:</span>
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">📱 Phone:</span>
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">📍 Location:</span>
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">🌐 Website:</span>
              <a href={data.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {data.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">💼 LinkedIn:</span>
              <a href={data.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Profile
              </a>
            </div>
          )}
          {data.github && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">💻 GitHub:</span>
              <a href={data.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Profile
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Profile Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
            Profile Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index} className="border-l-4 border-gray-800 pl-4">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p className="font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                      {exp.location && <p className="text-gray-500">{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.some(edu => edu.school || edu.degree) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-5">
            {data.education.map((edu, index) => (
              (edu.school || edu.degree) && (
                <div key={index} className="border-l-4 border-gray-800 pl-4">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 font-semibold">{edu.school}</p>
                      {edu.field && <p className="text-gray-600 italic">{edu.field}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600 font-medium">
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {edu.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.some(skill => skill.trim()) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills
              .filter(skill => skill.trim())
              .map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.some(lang => lang.name) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
            Languages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index} className="border-2 border-gray-800 rounded-lg p-3 bg-gray-50">
                  <p className="text-gray-900 font-bold">{lang.name}</p>
                  <p className="text-gray-600 text-sm">{lang.level}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  // Classic Template (Traditional with serif fonts)
  const renderClassicTemplate = () => (
    <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg cv-preview font-serif" id="cv-content">
      {/* Header Section */}
      <div className="mb-8 pb-4 border-b-2 border-blue-800 text-center">
        {data.photo && (
          <img 
            src={data.photo} 
            alt={data.fullName}
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-800 mx-auto mb-4"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
          {data.fullName}
        </h1>
        <p className="text-xl md:text-2xl text-blue-700 mb-4 italic">{data.title}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {data.email && <span>✉️ {data.email}</span>}
          {data.phone && <span>📱 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.website && (
            <a href={data.website} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
              🌐 Website
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
          )}
          {data.github && (
            <a href={data.github} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
              💻 GitHub
            </a>
          )}
        </div>
      </div>

      {/* Profile Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 italic">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                      {exp.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.some(edu => edu.school || edu.degree) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              (edu.school || edu.degree) && (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 italic">{edu.school}</p>
                      {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                      {edu.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.some(skill => skill.trim()) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills
              .filter(skill => skill.trim())
              .map((skill, index) => (
                <span key={index} className="text-gray-800">
                  {skill}{index < data.skills.filter(s => s.trim()).length - 1 && " • "}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.some(lang => lang.name) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-300 pb-1">
            Languages
          </h2>
          <div className="space-y-1">
            {data.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index}>
                  <span className="font-semibold text-gray-900">{lang.name}</span>
                  <span className="text-gray-600"> - {lang.level}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  // Minimal Template (Clean and spacious)
  const renderMinimalTemplate = () => (
    <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg cv-preview" id="cv-content">
      {/* Header Section */}
      <div className="mb-12 text-center">
        {data.photo && (
          <img 
            src={data.photo} 
            alt={data.fullName}
            className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border border-gray-200"
          />
        )}
        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-3 tracking-wide">
          {data.fullName}
        </h1>
        <p className="text-xl text-gray-600 mb-6 font-light">{data.title}</p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && (
            <a href={data.website} className="text-gray-600 hover:text-gray-900 underline" target="_blank" rel="noopener noreferrer">
              {data.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      </div>

      {/* Profile Summary */}
      {data.summary && (
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto font-light">
            {data.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-gray-500 mb-6 tracking-widest uppercase text-center">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.position}</h3>
                  <p className="text-gray-600 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto font-light">
                      {exp.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.some(edu => edu.school || edu.degree) && (
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-gray-500 mb-6 tracking-widest uppercase text-center">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              (edu.school || edu.degree) && (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{edu.degree}</h3>
                  <p className="text-gray-600 mb-2">{edu.school}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.field && ` • ${edu.field}`}
                  </p>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto font-light mt-2">
                      {edu.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.some(skill => skill.trim()) && (
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-gray-500 mb-6 tracking-widest uppercase text-center">
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills
              .filter(skill => skill.trim())
              .map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1 border border-gray-300 text-gray-700 text-sm font-light"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.some(lang => lang.name) && (
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-gray-500 mb-6 tracking-widest uppercase text-center">
            Languages
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {data.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index}>
                  <p className="text-gray-900 font-medium">{lang.name}</p>
                  <p className="text-gray-600 text-sm font-light">{lang.level}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  // Professional Template (Corporate style)
  const renderProfessionalTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg cv-preview" id="cv-content">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 md:p-10 rounded-t-lg">
        <div className="flex gap-6 items-center">
          {data.photo && (
            <img 
              src={data.photo} 
              alt={data.fullName}
              className="w-32 h-32 object-cover rounded-lg border-4 border-white flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {data.fullName}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">{data.title}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-100">
          {data.email && <div>✉️ {data.email}</div>}
          {data.phone && <div>📱 {data.phone}</div>}
          {data.location && <div>📍 {data.location}</div>}
          {data.website && (
            <a href={data.website} className="hover:text-white underline" target="_blank" rel="noopener noreferrer">
              🌐 Website
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} className="hover:text-white underline" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
          )}
          {data.github && (
            <a href={data.github} className="hover:text-white underline" target="_blank" rel="noopener noreferrer">
              💻 GitHub
            </a>
          )}
        </div>
      </div>

      <div className="p-8 md:p-10">
        {/* Profile Summary */}
        {data.summary && (
          <div className="mb-8 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-700">
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-700">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                (exp.company || exp.position) && (
                  <div key={index} className="pl-4 border-l-2 border-blue-300">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-700 font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-gray-700 font-medium">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </p>
                        {exp.location && <p className="text-gray-600">{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.some(edu => edu.school || edu.degree) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-700">
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                (edu.school || edu.degree) && (
                  <div key={index} className="pl-4 border-l-2 border-blue-300">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-700 font-semibold">{edu.school}</p>
                        {edu.field && <p className="text-gray-600 italic">{edu.field}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-700 font-medium">
                        <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {edu.description}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.some(skill => skill.trim()) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-700">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills
                .filter(skill => skill.trim())
                .map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-900 rounded text-sm font-semibold border border-blue-300"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.some(lang => lang.name) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-700">
              Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.languages
                .filter(lang => lang.name)
                .map((lang, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-gray-900 font-bold">{lang.name}</p>
                    <p className="text-gray-600 text-sm">{lang.level}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ATS-Friendly Template (Simple, parsable format)
  const renderATSTemplate = () => (
    <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg cv-preview" id="cv-content">
      {/* Header Section - Simple and clear */}
      <div className="mb-6 pb-4 border-b border-gray-400">
        <div className="flex gap-6 items-start">
          {data.photo && (
            <img 
              src={data.photo} 
              alt={data.fullName}
              className="w-24 h-24 object-cover rounded border-2 border-gray-400 flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {data.fullName}
            </h1>
            <p className="text-lg text-gray-700 mb-3">{data.title}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-700 space-y-1">
          {data.email && <div>Email: {data.email}</div>}
          {data.phone && <div>Phone: {data.phone}</div>}
          {data.location && <div>Location: {data.location}</div>}
          {data.website && <div>Website: {data.website}</div>}
          {data.linkedin && <div>LinkedIn: {data.linkedin}</div>}
          {data.github && <div>GitHub: {data.github}</div>}
        </div>
      </div>

      {/* Profile Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index}>
                  <div className="mb-1">
                    <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-800">{exp.company}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.some(edu => edu.school || edu.degree) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              (edu.school || edu.degree) && (
                <div key={index}>
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-800">{edu.school}</p>
                  {edu.field && <p className="text-gray-700">{edu.field}</p>}
                  <p className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.some(skill => skill.trim()) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Skills
          </h2>
          <p className="text-gray-800">
            {data.skills
              .filter(skill => skill.trim())
              .join(" • ")}
          </p>
        </div>
      )}

      {/* Languages */}
      {data.languages.some(lang => lang.name) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Languages
          </h2>
          <div className="space-y-1">
            {data.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index} className="text-gray-800">
                  {lang.name} - {lang.level}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Action Buttons */}
      <Card className="no-print flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
        <Button onClick={onBack} variant="outline">
          ← Back to Home
        </Button>
        
        {/* Paper Size Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">Paper Size:</span>
          <div className="flex gap-2">
            {paperSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setPaperSize(size.id)}
                className={`px-3 py-1.5 text-sm font-semibold border-2 rounded-lg transition-all ${
                  paperSize === size.id
                    ? "bg-yellow-200 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white border-gray-300 hover:border-black"
                }`}
              >
                {size.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onEdit} variant="outline">
            Edit CV
          </Button>
          <Button onClick={handleDownload}>
            📥 Download PDF
          </Button>
        </div>
      </Card>

      {/* Paper Size Info */}
      <div className="no-print text-center text-sm text-gray-600 bg-gray-50 border-2 border-gray-300 rounded-lg p-3">
        Selected: <span className="font-semibold">{currentPaperSize.name}</span>
      </div>

      {/* CV Preview - Template Based with Paper Size */}
      <div className={`mx-auto ${getPaperSizeClass()}`}>
        <style jsx global>{`
          @media print {
            @page {
              size: ${currentPaperSize.printSize};
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
            .cv-preview {
              box-shadow: none !important;
              border-radius: 0 !important;
            }
          }
        `}</style>
        {renderCVContent()}
      </div>
    </div>
  );
}
