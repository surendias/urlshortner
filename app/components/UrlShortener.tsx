// components/UrlShortener.tsx
"use client";
import React, { useState } from "react";

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [urlList, setUrlList] = useState<
    Array<{ original: string; shortened: string }>
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual URL shortening logic
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("URL shortening failed");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      setUrlList([...urlList, { original: url, shortened: data.shortUrl }]);
      setUrl("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-600">URL Shortener</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter URL to shorten
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Shortening..." : "Shorten URL"}
              </button>
            </form>
            {shortUrl && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <p className="text-sm font-medium text-gray-700">
                  Shortened URL:
                </p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {shortUrl}
                </a>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-gray-600">
              Previously Shortened URLs
            </h3>
            {urlList.length > 0 ? (
              <ul className="space-y-4">
                {urlList.map((item, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-md">
                    <p className="text-sm font-medium text-gray-700">
                      Original:
                    </p>
                    <p className="text-gray-600 break-all">{item.original}</p>
                    <p className="text-sm font-medium text-gray-700 mt-2">
                      Shortened:
                    </p>
                    <a
                      href={item.shortened}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {item.shortened}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No URLs shortened yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
