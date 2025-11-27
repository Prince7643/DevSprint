"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: any) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Something went wrong!</h1>
          <p className="text-gray-700 mt-2">We’re working on fixing it.</p>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
