"use client";

export default function GamePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Navigation */}
      {/* <nav className="p-4">
        <BackButton path="/dashboard" displayString="Dashboard" />
      </nav> */}

      {/* Main Game Container */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="aspect-video w-full max-w-6xl overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
          <iframe
            src="/unity/index.html"
            title="Unity WebGL Game"
            width="100%"
            height="100%"
            className="h-full w-full"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </main>
    </div>
  );
}
