"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Draft } from "../hooks/useDraftStorage";

interface WelcomeCardProps {
  onStartClick: () => void;
  onContinueDraft: (id: string) => void;
  onDeleteDraft: (id: string) => void;
  onTryExample: () => void;
  onPreviewExample: () => void;
  drafts: Draft[];
}

export default function WelcomeCard({ onStartClick, onContinueDraft, onDeleteDraft, onTryExample, onPreviewExample, drafts }: WelcomeCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleDeleteClick = (draft: Draft) => {
    if (confirm(`Are you sure you want to delete "${draft.data.fullName || draft.name}"? This action cannot be undone.`)) {
      onDeleteDraft(draft.id);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center">Curriculum Vitae Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-center text-gray-600 mb-4">
            Create professional CV with ease. Your data is stored locally in your browser.
          </p>
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-sm">📝 Notes:</p>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-700 space-y-1">
              <li>All data is stored locally in your browser</li>
              <li>Most fields are optional, fill what you need</li>
              <li>More complete data = better CV result</li>
            </ul>
          </div>
        </div>

        {/* Drafts List */}
        {drafts.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Your Drafts ({drafts.length})</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {drafts.map((draft) => (
                <div key={draft.id} className="border-2 border-gray-300 rounded-lg p-3 flex justify-between items-start hover:border-gray-400 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {draft.data.fullName || draft.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {draft.data.title || "No title"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Last updated: {formatDate(draft.updatedAt)}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-3">
                    <Button
                      onClick={() => onContinueDraft(draft.id)}
                      variant="outline"
                      size="sm"
                    >
                      Continue
                    </Button>
                    <button
                      onClick={() => handleDeleteClick(draft)}
                      className="text-red-500 hover:text-red-700 px-2"
                      title="Delete draft"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button onClick={onStartClick} size="lg" className="w-full">
          + Create New CV
        </Button>
        <div className="space-y-2 w-full">
          <p className="text-xs text-gray-600 text-center">Want to see an example first?</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="flex flex-col gap-1">
              <Button onClick={onTryExample} variant="outline" size="md" className="w-full">
                ✏️ Edit Example
              </Button>
              <p className="text-[10px] text-gray-500 text-center">Fill form with sample</p>
            </div>
            <div className="flex flex-col gap-1">
              <Button onClick={onPreviewExample} variant="outline" size="md" className="w-full">
                👁️ Preview Example
              </Button>
              <p className="text-[10px] text-gray-500 text-center">See final result</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

