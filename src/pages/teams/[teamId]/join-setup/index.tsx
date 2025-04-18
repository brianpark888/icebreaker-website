import { useState } from "react";
import { useRouter } from "next/router";

export default function ProfileSetup() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const { teamId } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");

    const res = await fetch("/api/teams/profile-edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        teamId,
        jobTitle,
        response: {
          q: selectedPrompt,
          a: answer,
        },
      }),
    });

    if (res.ok) {
      router.push(`/teams/${teamId}`);
    } else {
      const error = await res.json();
      console.error("Failed to update:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-gradient mt-6 text-center text-3xl font-bold tracking-tight">
            Tell Us About Yourself
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Share your job title and answer a fun prompt to help us get to know
            you better!
          </p>
        </div>

        <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 px-4 py-8 shadow backdrop-blur-sm sm:rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Job Title Input */}
              <div className="space-y-2">
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-foreground"
                >
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-md bg-background/50 p-2 text-sm text-foreground"
                  placeholder="Enter your job title..."
                />
              </div>

              {/* Prompt Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-foreground"
                >
                  Select a prompt...
                </label>
                <select
                  id="prompt"
                  value={selectedPrompt}
                  onChange={(e) => setSelectedPrompt(e.target.value)}
                  className="w-full rounded-md bg-background/50 p-2 text-sm text-foreground"
                >
                  <option value="">Choose a prompt</option>
                  <option value="What’s a project you’ve worked on that you're really proud of?">
                    What’s a project you’ve worked on that you're really proud
                    of?
                  </option>
                  <option value="What’s your work superpower — the thing you crush every time?">
                    What’s your work superpower — the thing you crush every
                    time?
                  </option>
                  <option value="How do you recharge after a hectic workweek?">
                    How do you recharge after a hectic workweek?
                  </option>
                  <option value="What’s your go-to self-care ritual?">
                    What’s your go-to self-care ritual?
                  </option>
                  <option value="What’s a simple productivity hack that actually works for you?">
                    What’s a simple productivity hack that actually works for
                    you?
                  </option>
                  <option value="If budget wasn’t an issue, what would your dream home office look like?">
                    If budget wasn’t an issue, what would your dream home office
                    look like?
                  </option>
                  <option value="What’s your most-used Slack emoji and what does it actually mean?">
                    What’s your most-used Slack emoji and what does it actually
                    mean?
                  </option>
                  <option value="What’s a random skill you picked up that surprisingly helps at work?">
                    What’s a random skill you picked up that surprisingly helps
                    at work?
                  </option>
                  <option value="What’s a hilarious or awkward virtual meeting moment you've had?">
                    What’s a hilarious or awkward virtual meeting moment you've
                    had?
                  </option>
                  <option value="Be honest — how many tabs or calendar events do you ignore daily?">
                    Be honest — how many tabs or calendar events do you ignore
                    daily?
                  </option>
                  <option value="What's your go-to work playlist or music vibe for getting in the zone?">
                    What's your go-to work playlist or music vibe for getting in
                    the zone?
                  </option>
                  <option value="What’s your ideal after-work wind-down activity?">
                    What’s your ideal after-work wind-down activity?
                  </option>
                  <option value="What’s your coffee or tea order — and does it say anything about you?">
                    What’s your coffee or tea order — and does it say anything
                    about you?
                  </option>
                  <option value="If you weren’t in your current career, what would you be doing?">
                    If you weren’t in your current career, what would you be
                    doing?
                  </option>
                  <option value="If your Zoom background could be anything, what would you pick?">
                    If your Zoom background could be anything, what would you
                    pick?
                  </option>
                  <option value="What’s your favorite part about working remotely?">
                    What’s your favorite part about working remotely?
                  </option>
                  <option value="What’s one thing on your bucket list you will make happen?">
                    What’s one thing on your bucket list you will make happen?
                  </option>
                  <option value="Recommend a book or podcast that made you think differently.">
                    Recommend a book or podcast that made you think differently.
                  </option>
                  <option value="Are you an early bird, night owl, or ‘just trying to survive’?">
                    Are you an early bird, night owl, or ‘just trying to
                    survive’?
                  </option>
                  <option value="What was your very first job — and what did it teach you?">
                    What was your very first job — and what did it teach you?
                  </option>
                  <option value="Drop a fun fact about yourself that almost no one knows.">
                    Drop a fun fact about yourself that almost no one knows.
                  </option>
                  <option value="What emoji best describes your vibe this week — and why?">
                    What emoji best describes your vibe this week — and why?
                  </option>
                </select>
              </div>

              {/* Answer Textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-foreground"
                >
                  Your Answer
                </label>
                <textarea
                  id="answer"
                  rows={4}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full rounded-md bg-background/50 p-2 text-sm text-foreground"
                  placeholder="Type your answer here..."
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Continue to Team Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
