'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [openAIKey, setOpenAIKey] = useState('');
  const [error, setError] = useState('');

  const handleProceed = () => {
    if (!openAIKey) {
      setError('Please enter your OpenAI API key');
      return;
    }
    localStorage.setItem('openAIKey', openAIKey);

     // so we are handling auth with backend url and getting the accessToken (TODO: need to implement this in the frontend)

    // window.location.href = `http://localhost:8000/auth`; // local url
    window.location.href = `https://email-classifications-gpt.onrender.com/auth`; // deployed url
  };

  return (
    <main className="flex min-h-screen text-black flex-col items-center justify-center bg-gray-900">
      <div className="p-16 bg-white rounded shadow-md ">
        <h1 className="text-2xl font-semibold mb-4">Gmail Email Classifier</h1>
        <div className="flex mt-4 space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter OpenAI API Key"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleProceed}
        >
          Login & Proceed
        </button>
      </div>
    </main>
  );
}
