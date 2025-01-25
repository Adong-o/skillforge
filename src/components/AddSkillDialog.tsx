import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { AuthDialog } from "./AuthDialog";
import { addDoc, collection } from "firebase/firestore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddSkillDialog() {
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [duration, setDuration] = useState("30");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add skills",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const skillData = {
        name: skillName,
        duration: parseInt(duration),
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        progress: 0,
        streak: 0,
        lastCheckin: null
      };

      await addDoc(collection(db, "skills"), skillData);
      
      toast({
        title: "Success",
        description: "Skill added successfully!",
      });
      
      setOpen(false);
      setSkillName("");
      setDuration("30");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!auth.currentUser) {
    return <AuthDialog mode="signup" />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
            <DialogDescription>
              What skill would you like to develop? Enter the name and duration below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="skill-name">Skill name</Label>
              <Input
                id="skill-name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g., Piano, Spanish, Photography"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Select value={duration} onValueChange={setDuration} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="30">1 month</SelectItem>
                  <SelectItem value="90">3 months</SelectItem>
                  <SelectItem value="180">6 months</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!skillName.trim() || isLoading}>
              {isLoading ? "Adding..." : "Add Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}