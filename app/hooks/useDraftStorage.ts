"use client";

import { useEffect, useState } from "react";
import { CVData } from "../components/CVForm";

export interface Draft {
  id: string;
  name: string;
  data: CVData;
  createdAt: string;
  updatedAt: string;
}

const DRAFTS_KEY = "cv-maker-drafts";

export function useDraftStorage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(DRAFTS_KEY);
      if (saved) {
        try {
          setDrafts(JSON.parse(saved));
        } catch (error) {
          console.error("Failed to load drafts:", error);
        }
      }
    }
  };

  const saveDraft = (draft: Draft) => {
    if (typeof window !== "undefined") {
      const existingIndex = drafts.findIndex((d) => d.id === draft.id);
      let updatedDrafts: Draft[];

      if (existingIndex >= 0) {
        updatedDrafts = [...drafts];
        updatedDrafts[existingIndex] = { ...draft, updatedAt: new Date().toISOString() };
      } else {
        updatedDrafts = [...drafts, draft];
      }

      setDrafts(updatedDrafts);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(updatedDrafts));
    }
  };

  const deleteDraft = (id: string) => {
    if (typeof window !== "undefined") {
      const updatedDrafts = drafts.filter((d) => d.id !== id);
      setDrafts(updatedDrafts);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(updatedDrafts));
    }
  };

  const getDraft = (id: string): Draft | undefined => {
    return drafts.find((d) => d.id === id);
  };

  const createNewDraft = (): Draft => {
    return {
      id: Date.now().toString(),
      name: `Draft ${new Date().toLocaleDateString()}`,
      data: {
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
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  return {
    drafts,
    saveDraft,
    deleteDraft,
    getDraft,
    createNewDraft,
    loadDrafts
  };
}
