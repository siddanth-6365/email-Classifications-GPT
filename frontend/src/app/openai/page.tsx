'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
    const [openAIKey, setOpenAIKey] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleProceed = () => {
        if (!openAIKey) {
            setError('Please enter your OpenAI API key');
            return;
        }
        localStorage.setItem('openAIKey', openAIKey);
        router.push("/emails");
    };

    useEffect(() => {
        const accessTokenFromUrl = searchParams.get('accessToken');
        if (accessTokenFromUrl) {
            localStorage.setItem('accessToken', accessTokenFromUrl);
        } else {
            alert('Access token not found, try logging again');
            router.push('/');
        }
    }, []);

    return (
        <main className="flex min-h-screen text-black flex-col items-center justify-center bg-gray-900">
            <div className="p-16 bg-white rounded shadow-md ">
                <h1 className="text-2xl font-semibold mb-4">Enter your openai key</h1>
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
                    Proceed
                </button>
            </div>
        </main>
    );
}
