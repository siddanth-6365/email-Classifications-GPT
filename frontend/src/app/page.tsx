'use client';

export default function Home() {

  const handleProceed = () => {
    const CURRENT_STATE = "production"
    // so we are handling auth with backend url and getting the accessToken (TODO: need to implement this in the frontend)
    if (CURRENT_STATE == "production") {
      window.location.href = `https://email-classifications-gpt.onrender.com/auth`; // deployed url
    } else {
      window.location.href = `http://localhost:8000/auth`; // local url
    }
  };

  return (
    <main className="flex min-h-screen text-black flex-col items-center justify-center bg-gray-900">
      <div className="p-16 bg-white rounded shadow-md ">
        <h1 className="text-2xl font-semibold mb-4">Email Classifier using GPT</h1>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleProceed}
      >
        Login using Google
      </button>
    </main>
  );
}
