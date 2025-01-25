import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { format, isAfter, isSameDay, addDays } from "date-fns";

interface SkillCardProps {
  id: string;
  name: string;
  progress: number;
  streak: number;
  lastCheckin: string | null;
  duration: number;
}

export function SkillCard({ id, name, progress, streak, lastCheckin, duration }: SkillCardProps) {
  const { toast } = useToast();

  const canCheckIn = () => {
    if (!lastCheckin) return true; // First check-in is always allowed
    
    const lastCheckinDate = new Date(lastCheckin);
    const today = new Date();
    
    // Allow check-in if it's a new day and not the same day as last check-in
    return !isSameDay(lastCheckinDate, today);
  };

  const handleCheckIn = async () => {
    if (!auth.currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to check in",
        variant: "destructive",
      });
      return;
    }

    if (!canCheckIn()) {
      toast({
        title: "Already checked in",
        description: "You can check in again tomorrow!",
        variant: "destructive",
      });
      return;
    }

    try {
      const skillRef = doc(db, "skills", id);
      const today = new Date();
      let newStreak = streak;
      let newProgress = progress;

      if (lastCheckin) {
        const lastCheckinDate = new Date(lastCheckin);
        const dayAfterLastCheckin = addDays(lastCheckinDate, 1);

        // If they missed a day (more than one day gap), reset streak
        if (isAfter(today, addDays(lastCheckinDate, 2))) {
          newStreak = 1; // Reset streak but count today
          toast({
            title: "Streak reset!",
            description: "You missed a day, but don't worry - start building your streak again!",
            variant: "destructive",
          });
        } else if (isAfter(today, dayAfterLastCheckin)) {
          // If checking in the next day, increment streak
          newStreak += 1;
        }
      } else {
        // First check-in
        newStreak = 1;
      }

      // Calculate progress based on duration
      newProgress = Math.min(100, (newStreak / duration) * 100);

      await updateDoc(skillRef, {
        lastCheckin: today.toISOString(),
        streak: newStreak,
        progress: newProgress,
      });

      toast({
        title: "Success!",
        description: `Check-in recorded! ${newStreak} day streak 🎉`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check in. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 hover:scale-105 transition-transform duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {lastCheckin ? `Last practice: ${format(new Date(lastCheckin), 'MMM dd, yyyy')}` : 'Start practicing today'}
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Trophy className="w-3 h-3" />
          {streak} days
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <button 
        onClick={handleCheckIn}
        disabled={!canCheckIn()}
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200
          ${canCheckIn() 
            ? 'bg-primary text-primary-foreground hover:opacity-90' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
      >
        <CheckCircle2 className="w-4 h-4" />
        {canCheckIn() ? 'Check In' : 'Already Checked In Today'}
      </button>
    </Card>
  );
}