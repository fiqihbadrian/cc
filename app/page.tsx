// referensi https://github.com/JastinXyz/cvmaker
"use client";

import { useState, useEffect } from "react";
import WelcomeCard from "./components/WelcomeCard";
import CVForm, { CVData } from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import { useDraftStorage, Draft } from "./hooks/useDraftStorage";
import { sampleCVData } from "./data/sampleData";

type ViewState = "welcome" | "form" | "preview";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>("welcome");
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const { drafts, saveDraft, deleteDraft, getDraft, createNewDraft } = useDraftStorage();

  const handleStartClick = () => {
    const newDraft = createNewDraft();
    setCurrentDraftId(newDraft.id);
    setCVData(newDraft.data);
    saveDraft(newDraft);
    setCurrentView("form");
  };

  const handleContinueDraft = (id: string) => {
    const draft = getDraft(id);
    if (draft) {
      setCurrentDraftId(draft.id);
      setCVData(draft.data);
      setCurrentView("form");
    }
  };

  const handleDeleteDraft = (id: string) => {
    deleteDraft(id);
  };

  const handleTryExample = () => {
    const exampleDraft = createNewDraft();
    exampleDraft.data = sampleCVData;
    exampleDraft.name = "Example CV - John Anderson";
    setCurrentDraftId(exampleDraft.id);
    setCVData(exampleDraft.data);
    saveDraft(exampleDraft);
    setCurrentView("form");
  };

  const handlePreviewExample = () => {
    setCVData(sampleCVData);
    setCurrentDraftId(null); // Don't save preview to drafts
    setCurrentView("preview");
  };

  const handleFormSubmit = (data: CVData) => {
    setCVData(data);
    // Save draft before preview
    if (currentDraftId) {
      const draft = getDraft(currentDraftId);
      if (draft) {
        saveDraft({ ...draft, data });
      }
    }
    setCurrentView("preview");
  };

  const handleBackToWelcome = () => {
    setCurrentView("welcome");
    setCurrentDraftId(null);
  };

  const handleEditCV = () => {
    setCurrentView("form");
  };

  const handleAutoSave = (data: CVData) => {
    if (currentDraftId) {
      const draft = getDraft(currentDraftId);
      if (draft) {
        saveDraft({ ...draft, data });
      }
    }
  };

  return (
    <main className="min-h-screen bg-pattern">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        {currentView !== "preview" && (
          <div className="z-10 w-full max-w-5xl items-center text-center mb-8 no-print">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
              Welcome to CV Maker! 📄
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Create Your Professional CV in Minutes
            </p>
          </div>
        )}
        
        {currentView === "welcome" && (
          <WelcomeCard 
            onStartClick={handleStartClick}
            onContinueDraft={handleContinueDraft}
            onDeleteDraft={handleDeleteDraft}
            onTryExample={handleTryExample}
            onPreviewExample={handlePreviewExample}
            drafts={drafts}
          />
        )}
        
        {currentView === "form" && (
          <CVForm 
            onBack={handleBackToWelcome} 
            onSubmit={handleFormSubmit}
            initialData={cvData || undefined}
            onAutoSave={handleAutoSave}
          />
        )}
        
        {currentView === "preview" && cvData && (
          <>
            <div className="w-full max-w-4xl text-center mb-6 no-print">
              <h1 className="text-4xl font-bold text-gray-900">
                {currentDraftId ? "Your CV Preview" : "Example CV Preview"}
              </h1>
              <p className="text-gray-700 mt-2">
                {currentDraftId 
                  ? "Review your CV and download when ready" 
                  : "This is an example CV. You can create your own by going back to home."}
              </p>
            </div>
            <CVPreview 
              data={cvData} 
              onBack={handleBackToWelcome}
              onEdit={handleEditCV}
            />
          </>
        )}
      </div>
    </main>
  );
}
