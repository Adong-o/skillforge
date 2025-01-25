import { HelpCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Link } from "react-router-dom";

export function Footer() {
  const { toast } = useToast();

  const handleSupport = () => {
    toast({
      title: "Support",
      description: "Our support team will get back to you within 24 hours at support@skillforge.com",
    });
  };

  return (
    <footer className="border-t bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">SkillForge</h3>
            <p className="text-sm text-gray-600">
              Transform your learning journey. Build lasting habits and master any skill with smart progress tracking and proven techniques.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Smart Skill Tracking</li>
              <li>Advanced Pomodoro Timer</li>
              <li>Progress Analytics</li>
              <li>Achievement System</li>
              <li>Daily Streaks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/learning-guides" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Learning Guides
                </Link>
              </li>
              <li>
                <Link to="/success-stories" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/blog" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex flex-col space-y-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleSupport}
              >
                <HelpCircle className="w-4 h-4" />
                Support
              </Button>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
                Follow us on X
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} SkillForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}