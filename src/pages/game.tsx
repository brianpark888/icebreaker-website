'use client'

import Link from "next/link"
import { Suspense } from "react"

// Dynamically import the game component to avoid SSR issues
// const GameCanvas = dynamic(() => import("@/components/game-canvas"), {
//   ssr: false,
//   loading: () => <GameLoader />,
// })

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex flex-col">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-10" />

      {/* Navigation */}
      <nav className="p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <svg className="w-5 h-5 transition-transform hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Game Container */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
          {/* <Suspense fallback={<GameLoader />}>
          </Suspense> */}
        </div>
      </main>
    </div>
  )
}

// Loading Indicator
function GameLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-gray-600 border-t-white animate-spin" />
        <p className="text-lg font-medium text-gray-400">Loading game...</p>
      </div>
    </div>
  )
}
