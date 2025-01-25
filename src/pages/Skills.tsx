import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AddSkillDialog } from "@/components/AddSkillDialog";
import { SkillCard } from "@/components/SkillCard";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

const Skills = () => {
  const [userId, setUserId] = useState<string | null>(null);

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
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    enabled: !!userId,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Skills Journey</h1>
          <p className="text-sage-600 mb-8">Track and master your skills with consistent practice.</p>
          <AddSkillDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {isLoading ? (
            <p className="text-center col-span-3">Loading your skills...</p>
          ) : skills.length > 0 ? (
            skills.map((skill: any) => (
              <SkillCard
                key={skill.id}
                id={skill.id}
                name={skill.name}
                progress={skill.progress}
                streak={skill.streak}
                lastCheckin={skill.lastCheckin}
                duration={skill.duration}
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-sage-600">
              No skills added yet. Start by adding a skill you want to learn!
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Skills;