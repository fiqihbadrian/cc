// referensi https://github.com/JastinXyz/cvmaker
"use client";

import { useState } from "react";
import WelcomeCard from "./components/WelcomeCard";
import CVForm from "./components/CVForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 gap-8">
      <div className="z-10 w-full max-w-5xl items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to CV Maker!</h1>
        <p className="text-lg md:text-xl text-gray-600">Create Your Professional CV</p>
      </div>
      
      {!showForm ? (
        <WelcomeCard onStartClick={() => setShowForm(true)} />
      ) : (
        <CVForm onBack={() => setShowForm(false)} />
      )}
    </div>
  );
}
