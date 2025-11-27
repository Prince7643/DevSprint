'use client';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white px-4">

      {/* Heading */}
      <h1 className="text-4xl font-bold">Page Not Found</h1>

      {/* Subtext */}
      <p className="text-gray-400 mt-2 text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
      >
        Go Home
      </a>
    </div>
  );
}
