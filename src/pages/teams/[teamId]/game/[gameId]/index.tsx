"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function GamePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState(""); // Initially empty to prevent loading
  const router = useRouter();
  const { teamId, gameId } = router.query;

  useEffect(() => {
    const handleIframeReady = (event: MessageEvent) => {
      if (event.data?.type === "iframe-ready") {
        const username = localStorage.getItem("username");
        const message = { username, teamId, gameId };

        // ✅ Now the iframe is ready — send it the message
        iframeRef.current?.contentWindow?.postMessage(message, "*");
      }
    };

    window.addEventListener("message", handleIframeReady);

    // Load the iframe immediately, then wait for "ready"
    if (gameId) {
      setIframeSrc("/unity/index.html");
    }

    return () => {
      window.removeEventListener("message", handleIframeReady);
    };
  }, [gameId]);

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-900 text-white">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="aspect-video w-full max-w-6xl overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
          <iframe
            ref={iframeRef}
            src={iframeSrc} // Conditional src, set only after message
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
