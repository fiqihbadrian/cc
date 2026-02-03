interface WelcomeCardProps {
  onStartClick: () => void;
}

export default function WelcomeCard({ onStartClick }: WelcomeCardProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 p-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="text-2xl font-semibold">Create Your CV</h2>
        <p className="text-gray-600">Input your data to create a professional CV.</p>
        <div className="w-full mt-6">
          <button 
            onClick={onStartClick}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}
