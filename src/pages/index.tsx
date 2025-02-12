import { Users, Gamepad2, Rocket, Globe2 } from "lucide-react"
import Link from "next/link"
// import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import HeroScene to avoid SSR issues
const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
})

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};



export default function Home() {
  const features: Feature[] = [
    {
      title: "Icebreakers That Actually Work",
      description: "Get new remote teams talking in minutes.",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      title: "Team Building Made Fun",
      description: "Strengthen collaboration and friendships naturally.",
      icon: <Gamepad2 className="h-6 w-6 text-white" />,
    },
    {
      title: "Seamless Onboarding",
      description: "Help new hires feel like part of the team from day one.",
      icon: <Rocket className="h-6 w-6 text-white" />,
    },
    {
      title: "No Installations, No Hassle",
      description: "Just open the link and play in your browser.",
      icon: <Globe2 className="h-6 w-6 text-white" />,
    },
  ];


  const steps = [
    {
      title: "Sign In",
      description: "Create an account and access the dashboard.",
    },
    {
      title: "Choose a Game",
      description: "Pick from fun, interactive team-building activities.",
    },
    {
      title: "Invite Your Team",
      description: "Send a link and start playing instantly.",
    },
  ];



  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      
      <div className="flex h-16 items-center gap-2 px-6 border-b border-muted/20 absolute inline-flex rounded-fully px-3 py-1 text-sm font-semibold leading-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
              <span className="font-semibold">Icebreakers</span>
            </div>
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-8 text-gradient">
              The Best Way for Remote Teams to Connect, Bond, and Onboard.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              No more awkward Zoom calls—play fun, engaging games that help remote teams build relationships
              effortlessly.
            </p>
            <div className="mt-10">
              <Link href="/login">
                <button
                  className="text-lg px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 animate-glow"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient">Why Use Our Platform?</h2>
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative p-8 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20 hover:border-primary/50 transition-all duration-300 glow-border"
                >
                  <div className="absolute -top-4 left-4">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-4 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient">How It Works</h2>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 animate-pulse-slow">
                      <span className="text-2xl font-bold text-white">{index + 1}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-4 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient">
              Join Other Remote Teams Building Better Connections!
            </h2>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient mb-8">
              Ready to Build Stronger Remote Teams?
            </h2>
            <div className="mt-10">
              <Link href="/login">
                <button
                  className="text-lg px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 animate-glow"
                >
                  Sign Up & Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
