"use client";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Trophy,
  Gamepad2,
  Activity,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set } from "zod";
import { useCallback } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { teamId, profileId } = router.query;
  const [myData, setMyData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatement, setSelectedStatement] = useState<string | null>(
    null,
  );
  const [shuffledStatements, setShuffledStatements] = useState<
    { text: string; isLie: boolean }[]
  >([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  /* …existing code… */

  // ⬇️ new effect — fires once both records are in state
  useEffect(() => {
    if (!myData?.id || !user?.id) return;

    // 🔒 pair was stored in sorted order, so sort before querying
    const [id1, id2] = [myData.id, user.id].sort();

    const checkAlreadyAnswered = async () => {
      try {
        const res = await fetch(
          `/api/team-members/check-truth-lie?myId=${id1}&profileId=${id2}`,
        );
        const data = await res.json();

        if (res.ok && data.exists) {
          // they already answered → lock the UI
          setHasSubmitted(true);

          // (optional) surface their previous result
          if (data.correct !== null) {
            setToastMessage(
              data.correct
                ? "You’ve already guessed correctly! 🎉"
                : "You’ve already guessed, and it was incorrect.",
            );
            setToastType(data.correct ? "success" : "error");
          }
        }
      } catch (err) {
        console.error("Error checking Two‑Truths‑&‑Lie status:", err);
      }
    };

    checkAlreadyAnswered();
  }, [myData, user]);

  useEffect(() => {
    if (user?.two_truths_and_lie) {
      const { truth1, truth2, lie } = user.two_truths_and_lie;

      const statements = [
        { text: truth1, isLie: false },
        { text: truth2, isLie: false },
        { text: lie, isLie: true },
      ];

      setShuffledStatements(statements.sort(() => Math.random() - 0.5));
    }
  }, [user]);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await fetch(
          `/api/user/${localStorage.getItem("username")}?teamId=${teamId}`,
        );
        const data = await res.json();
        setMyData(data.user);
        if (res.ok) {
          console.log("My data:", data);
        } else {
          console.error("Failed to fetch my data", data.detail);
        }
      } catch (err) {
        console.error("Error fetching my data:", err);
      }
    };
    if (teamId) fetchMyData();
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user/${profileId}?teamId=${teamId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          console.error("Failed to load user", data.detail);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (profileId && teamId) fetchUserData();
  }, [profileId, teamId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">User not found</h1>
          <Button onClick={() => router.push(`/teams/${teamId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push(`/teams/${teamId}`)}
                className="flex items-center justify-center rounded-lg p-1 transition-colors duration-200 ease-in-out hover:bg-muted/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h1 className="text-gradient text-3xl font-bold">
                {user.username}'s Profile
              </h1>
            </div>

            {/* Profile Header */}
            <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <Image
                  src={
                    user.imgUrl ||
                    "/placeholder.svg?height=120&width=120&query=profile"
                  }
                  alt={user.username}
                  width={120}
                  height={120}
                  className="rounded-full bg-muted"
                />
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                  <p className="text-muted-foreground">
                    {user.role || "Team Member"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                    {user.email && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{user.company}</span>
                      </div>
                    )}
                    {user.joined_date && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Joined{" "}
                          {new Date(user.joined_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-3">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Leadership Score
                    </p>
                    <p className="text-2xl font-bold">
                      {user.leadership_score || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {/* <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-semibold">Bio</h2>
              <div className="rounded-xl bg-muted/30 p-5">
                <p className="text-muted-foreground">
                  {user.bio ||
                    `${user.username} is a valued member of the team with expertise in leadership and collaboration. 
                    They have participated in ${games.length} games and contributed significantly to team activities.
                    Their leadership style focuses on empowering team members and driving results through effective communication.`}
                </p>
              </div>
            </div> */}

            {user.two_truths_and_lie && (
              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-semibold">
                  Two Truths and a Lie
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {shuffledStatements.map((statement, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (!hasSubmitted) setSelectedStatement(statement.text);
                      }}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        selectedStatement === statement.text
                          ? "border-blue-500 dark:bg-blue-900/20"
                          : "border-muted bg-muted/30"
                      } ${hasSubmitted ? "pointer-events-none opacity-50" : "hover:border-blue-300"}`}
                    >
                      <p className="text-muted-foreground">{statement.text}</p>
                    </div>
                  ))}
                </div>
                {!hasSubmitted && (
                  <div className="mt-4 text-center">
                    <Button
                      disabled={!selectedStatement || hasSubmitted}
                      onClick={async () => {
                        const chosen = shuffledStatements.find(
                          (s) => s.text === selectedStatement,
                        );
                        const isCorrect = chosen && chosen.isLie;
                        const body = {
                          myId: myData.id,
                          profileId: user.id,
                          correct: isCorrect,
                        };
                        console.log(body);

                        try {
                          const res = await fetch(
                            "/api/team-members/submit-truth-lie",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(body),
                            },
                          );

                          if (res.ok) {
                            setToastMessage(
                              isCorrect
                                ? "🎉 Correct! That was the lie."
                                : "❌ You chose a truth!",
                            );
                            setToastType(isCorrect ? "success" : "error");
                            setHasSubmitted(true);
                          } else {
                            setToastMessage(
                              "Something went wrong submitting your answer.",
                            );
                            setToastType("error");
                          }
                        } catch (error) {
                          console.error(error);
                          setToastMessage("An unexpected error occurred.");
                          setToastType("error");
                        }
                      }}
                    >
                      Submit Guess
                    </Button>
                  </div>
                )}

                {toastMessage && (
                  <div
                    className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
                      toastType === "success"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20"
                    }`}
                  >
                    {toastMessage}
                  </div>
                )}
              </div>
            )}

            {/* {user.promptResponse?.q ? (
              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-semibold">
                  {user.promptResponse.q}
                </h2>
                <div className="rounded-xl bg-muted/30 p-5">
                  <p className="text-muted-foreground">
                    {user.promptResponse.a ||
                      `${user.username} is a valued member of the team with expertise in leadership and collaboration. 
                    They have participated in ${games.length} games and contributed significantly to team activities.
                    Their leadership style focuses on empowering team members and driving results through effective communication.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-semibold">
                  No Prompt Response Found
                </h2>
                <div className="rounded-xl bg-muted/30 p-5">
                  <p className="text-muted-foreground">
                    {user.username} has not provided a prompt response yet.
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
}
