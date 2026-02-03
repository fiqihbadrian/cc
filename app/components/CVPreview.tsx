"use client";

import { CVData } from "./CVForm";

interface CVPreviewProps {
  data: CVData;
  onBack: () => void;
  onEdit: () => void;
}

export default function CVPreview({ data, onBack, onEdit }: CVPreviewProps) {
  const handleDownload = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="w-full max-w-5xl space-y-4">
      {/* Action Buttons */}
      <div className="flex justify-between items-center no-print bg-white p-4 rounded-lg shadow border border-gray-200">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          ← Back to Home
        </button>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Edit CV
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* CV Preview */}
      <div className="bg-white p-12 shadow-2xl rounded-lg cv-preview" id="cv-content">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName}</h1>
          <p className="text-xl text-gray-600 mb-4">{data.title}</p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
            {data.email && (
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>{data.phone}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{data.location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 mt-2">
            {data.website && (
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <a href={data.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {data.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {data.linkedin && (
              <div className="flex items-center gap-2">
                <span>💼</span>
                <a href={data.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            )}
            {data.github && (
              <div className="flex items-center gap-2">
                <span>💻</span>
                <a href={data.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Profile Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                (exp.company || exp.position) && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                (edu.school || edu.degree) && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700 font-medium">{edu.school}</p>
                        {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills
                .filter(skill => skill.trim())
                .map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.some(lang => lang.name) && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {data.languages
                .filter(lang => lang.name)
                .map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{lang.name}</span>
                    <span className="text-gray-600 text-sm">{lang.level}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
