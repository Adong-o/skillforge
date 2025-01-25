import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stories = [
  {
    name: "Sarah Chen",
    skill: "Web Development",
    duration: "6 months",
    story: "Using SkillForge's structured approach and Pomodoro timer, I went from complete beginner to landing my first developer job in just 6 months.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Michael Rodriguez",
    skill: "Digital Marketing",
    duration: "3 months",
    story: "The progress tracking feature helped me stay motivated. I've now started my own marketing agency thanks to the skills I developed.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Emma Thompson",
    skill: "Data Science",
    duration: "8 months",
    story: "SkillForge's habit-building approach made learning Python and statistics manageable alongside my full-time job.",
    avatar: "/placeholder.svg"
  }
];

const SuccessStories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-sage-600">Real people, real transformations with SkillForge</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {stories.map((story) => (
            <Card key={story.name} className="glass-card hover-scale">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={story.avatar} alt={story.name} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{story.name}</CardTitle>
                <CardDescription>{story.skill} • {story.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600 text-center">{story.story}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessStories;