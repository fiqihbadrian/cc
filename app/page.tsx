// referensi https://github.com/JastinXyz/cvmaker
"use client";

import { useState } from "react";
import WelcomeCard from "./components/WelcomeCard";
import CVForm, { CVData } from "./components/CVForm";
import CVPreview from "./components/CVPreview";

type ViewState = "welcome" | "form" | "preview";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>("welcome");
  const [cvData, setCVData] = useState<CVData | null>(null);

  const handleStartClick = () => {
    setCurrentView("form");
  };

  const handleFormSubmit = (data: CVData) => {
    setCVData(data);
    setCurrentView("preview");
  };

  const handleBackToWelcome = () => {
    setCurrentView("welcome");
  };

  const handleEditCV = () => {
    setCurrentView("form");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 gap-8">
      {currentView !== "preview" && (
        <div className="z-10 w-full max-w-5xl items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to CV Maker!</h1>
          <p className="text-lg md:text-xl text-gray-600">Create Your Professional CV</p>
        </div>
      )}
      
      {currentView === "welcome" && (
        <WelcomeCard onStartClick={handleStartClick} />
      )}
      
      {currentView === "form" && (
        <CVForm 
          onBack={handleBackToWelcome} 
          onSubmit={handleFormSubmit}
        />
      )}
      
      {currentView === "preview" && cvData && (
        <CVPreview 
          data={cvData} 
          onBack={handleBackToWelcome}
          onEdit={handleEditCV}
        />
      )}
    </div>
  );
}
