import { AddSkillDialog } from "@/components/AddSkillDialog";
import { SkillCard } from "@/components/SkillCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Target, Timer, Trophy, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const features = [
  {
    title: "Track Your Progress",
    description: "Set goals and monitor your improvement over time with detailed analytics.",
    icon: Target,
  },
  {
    title: "Stay Focused",
    description: "Use our built-in Pomodoro timer to maintain productivity during practice sessions.",
    icon: Timer,
  },
  {
    title: "Build Streaks",
    description: "Maintain your motivation with daily streaks and achievements.",
    icon: Trophy,
  },
];

const Index = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalStreak, setTotalStreak] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ['skills', userId],
    queryFn: async () => {
      if (!userId) return [];
      const skillsQuery = query(
        collection(db, "skills"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(skillsQuery);
      const skillsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Calculate overall progress and total streak
      if (skillsData.length > 0) {
        const totalProgress = skillsData.reduce((acc: number, skill: any) => acc + skill.progress, 0);
        const avgProgress = totalProgress / skillsData.length;
        setOverallProgress(avgProgress);

        const totalStreaks = skillsData.reduce((acc: number, skill: any) => acc + skill.streak, 0);
        setTotalStreak(totalStreaks);
      }

      return skillsData;
    },
    enabled: !!userId,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container py-20 px-4 mt-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-900 mb-6 animate-fade-in">
            Master Any Skill with SkillHabit
          </h1>
          <p className="text-lg text-sage-600 mb-8 animate-fade-in">
            Track your progress, build consistent habits, and achieve your learning goals with our powerful skill development platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <Button size="lg" className="gap-2">
              Get Started
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-lg glass-card hover-scale">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sage-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Overview Section */}
      {userId && skills.length > 0 && (
        <section className="container py-10 px-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Track your overall progress across all skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Overall Progress</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Achievement Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-primary" />
                          <CardTitle className="text-sm">Total Streaks</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-2xl font-bold">{totalStreak}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <CardTitle className="text-sm">Active Skills</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-2xl font-bold">{skills.length}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Skills Section */}
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Start Tracking Your Skills</h2>
          <p className="text-sage-600 mb-8">See how SkillHabit can help you master any skill with consistent practice.</p>
          <AddSkillDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {isLoading ? (
            <p className="text-center col-span-3">Loading your skills...</p>
          ) : skills.length > 0 ? (
            skills.map((skill: any) => (
              <div key={skill.id} className="animate-slide-up">
                <SkillCard
                  id={skill.id}
                  name={skill.name}
                  progress={skill.progress}
                  streak={skill.streak}
                  lastCheckin={skill.lastCheckin}
                  duration={skill.duration}
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-sage-600">
              No skills added yet. Start by adding a skill you want to learn!
            </p>
          )}
        </div>
      </section>

      {/* Pomodoro Section */}
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Stay Focused</h2>
          <p className="text-sage-600">Use our Pomodoro timer to maintain productivity during practice sessions.</p>
        </div>
        <PomodoroTimer />
      </section>

      <Footer />
    </div>
  );
};

export default Index;