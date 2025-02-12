"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { ErrorBoundary } from "./error-boundary"

// Dynamically import the 3D scene to avoid SSR issues
const Scene = dynamic(() => import("./3d-scene"), {
  ssr: false,
  loading: () => <FallbackBackground />,
})

// Fallback gradient background
function FallbackBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-blue-500/20 animate-gradient"></div>
      <div className="absolute inset-0 bg-grid opacity-[0.02]"></div>
    </div>
  )
}

export default function HeroScene() {
  return (
    <ErrorBoundary fallback={<FallbackBackground />}>
      <Suspense fallback={<FallbackBackground />}>
        <Scene />
      </Suspense>
    </ErrorBoundary>
  )
}

