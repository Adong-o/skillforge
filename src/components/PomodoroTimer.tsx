import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Coffee, Brain, Book } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type SessionType = "focus" | "short-break" | "long-break";
type SessionHistory = {
  type: SessionType;
  duration: number;
  completedAt: Date;
};

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(25);
  const [sessionType, setSessionType] = useState<SessionType>("focus");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
  }, []);

  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleSessionComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    if (soundEnabled && audioRef.current) {
      audioRef.current.play();
    }
    
    const newHistory: SessionHistory = {
      type: sessionType,
      duration: duration,
      completedAt: new Date(),
    };
    
    setSessionHistory((prev) => [...prev, newHistory]);
    setSessionsCompleted((prev) => prev + 1);
    
    toast({
      title: "Session Complete! 🎉",
      description: `Great job! You've completed a ${duration}-minute ${sessionType} session.`,
    });
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0]);
    setTimeLeft(value[0] * 60);
  };

  const handleSessionTypeChange = (value: SessionType) => {
    setSessionType(value);
    switch (value) {
      case "focus":
        setDuration(25);
        setTimeLeft(25 * 60);
        break;
      case "short-break":
        setDuration(5);
        setTimeLeft(5 * 60);
        break;
      case "long-break":
        setDuration(15);
        setTimeLeft(15 * 60);
        break;
    }
  };

  const getSessionIcon = () => {
    switch (sessionType) {
      case "focus":
        return <Brain className="w-4 h-4" />;
      case "short-break":
        return <Coffee className="w-4 h-4" />;
      case "long-break":
        return <Book className="w-4 h-4" />;
    }
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="p-6 rounded-lg glass-card max-w-sm mx-auto">
      <div className="text-center">
        <div className="flex justify-between items-center mb-4">
          <Select value={sessionType} onValueChange={handleSessionTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Session Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="focus">Focus Session</SelectItem>
              <SelectItem value="short-break">Short Break</SelectItem>
              <SelectItem value="long-break">Long Break</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>

        <div className="relative mb-8">
          <div className="text-6xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-2">Session Length (minutes)</p>
          <Slider
            defaultValue={[25]}
            max={60}
            min={1}
            step={1}
            value={[duration]}
            onValueChange={handleDurationChange}
            disabled={isRunning}
            className="w-full"
          />
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Button onClick={toggleTimer} size="lg" className="w-32">
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="ml-2">{isRunning ? 'Pause' : 'Start'}</span>
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            {getSessionIcon()}
            <span className="capitalize">{sessionType} Session</span>
          </div>
          <Badge variant="secondary" className="mb-2">
            {sessionsCompleted} sessions completed today
          </Badge>
          {sessionHistory.length > 0 && (
            <div className="text-xs text-gray-500 mt-4">
              Last session: {sessionHistory[sessionHistory.length - 1].type} - {' '}
              {new Date(sessionHistory[sessionHistory.length - 1].completedAt).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}