"use client";

import { useState } from "react";

// A simple loading spinner component
const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResult("");
    setError("");

    // The API endpoint for your FastAPI server
    const apiUrl = "https://research-analyst.onrender.com/analyze-article";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        // Handle HTTP errors from the API (like 400 or 500)
        const errorData = await response.json();
        throw new Error(errorData.detail || "An unknown error occurred.");
      }

      const data = await response.json();
      setResult(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-12 md:p-24 bg-gray-900 text-gray-100">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Smriti's Work Assistant
        </h1>
        <p className="hidden lg:block fixed left-0 top-0 justify-center border-b border-gray-700 bg-gray-800 from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-800/60 lg:p-4">
          Powered by Harsh's Love
        </p>
      </div>

      <div className="w-full max-w-3xl mt-16">
        <p className="text-gray-400 mb-4 text-center">
          Enter a URL and a question to analyze any academic article.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g., check this article and give me information on "amino acid Mutation" the url is https://journals.asm.org/doi/...'
            className="w-full h-40 p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <LoadingSpinner /> : "Analyze Article"}
          </button>
        </form>

        {/* --- Result and Error Display --- */}
        <div className="mt-12">
          {error && (
            <div className="p-6 bg-red-900/50 border border-red-700 rounded-lg">
              <h3 className="font-bold text-red-400 mb-2">Error</h3>
              <p className="text-red-300 whitespace-pre-wrap">{error}</p>
            </div>
          )}
          {result && (
            <div className="p-6 bg-gray-800/60 border border-gray-700 rounded-lg">
              <h3 className="font-bold text-purple-400 mb-4">Analysis Complete</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
