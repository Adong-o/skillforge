import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PomodoroTimer } from "@/components/PomodoroTimer";

const Timer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">Focus Timer</h1>
        <div className="max-w-xl mx-auto">
          <PomodoroTimer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Timer;