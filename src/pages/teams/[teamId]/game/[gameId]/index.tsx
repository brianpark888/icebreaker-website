'use client'
import BackButton from "@/components/ui/BackButton"


// Dynamically import the game component to avoid SSR issues
// const GameCanvas = dynamic(() => import("@/components/game-canvas"), {
//   ssr: false,
//   loading: () => <GameLoader />,
// })

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative flex flex-col">
      
      {/* Navigation */}
      {/* <nav className="p-4">
        <BackButton path="/dashboard" displayString="Dashboard" />
      </nav> */}

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
// function GameLoader() {
//   return (
//     <div className="w-full h-full flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-16 h-16 rounded-full border-4 border-gray-600 border-t-white animate-spin" />
//         <p className="text-lg font-medium text-gray-400">Loading game...</p>
//       </div>
//     </div>
//   )
// }
