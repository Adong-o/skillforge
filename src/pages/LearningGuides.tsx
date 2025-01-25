import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const guides = [
  {
    title: "Getting Started with SkillForge",
    description: "Learn how to set up your first skill and start tracking progress effectively.",
    content: "A comprehensive guide to help you maximize your learning potential with SkillForge's features."
  },
  {
    title: "Mastering the Pomodoro Technique",
    description: "Optimize your learning sessions with our advanced Pomodoro timer.",
    content: "Discover how to use time-blocking effectively for better focus and productivity."
  },
  {
    title: "Building Lasting Learning Habits",
    description: "Transform your practice sessions into sustainable habits.",
    content: "Learn the science behind habit formation and how SkillForge helps you maintain consistency."
  },
  {
    title: "Advanced Progress Tracking",
    description: "Make the most of SkillForge's analytics and tracking features.",
    content: "Understand your learning patterns and optimize your skill development journey."
  }
];

const LearningGuides = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Guides</h1>
          <p className="text-sage-600">Comprehensive resources to enhance your skill development journey</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {guides.map((guide) => (
            <Card key={guide.title} className="glass-card hover-scale">
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600">{guide.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearningGuides;