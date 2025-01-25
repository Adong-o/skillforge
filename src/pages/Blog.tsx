import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogs = [
  {
    title: "Introducing SkillForge: A New Era in Skill Development and Learning",
    description: "Learn how SkillForge is revolutionizing the way people acquire and master new skills through innovative technology and proven methodologies.",
    content: "In today's rapidly evolving digital landscape, traditional learning platforms often fall short in delivering effective skill development solutions. We're excited to introduce SkillForge, a groundbreaking platform that combines cutting-edge technology with proven learning methodologies to transform how people master new skills.\n\nUnlike conventional platforms that focus solely on content delivery, SkillForge emphasizes the importance of habit formation and consistent practice. Our platform integrates smart progress tracking, customizable Pomodoro sessions, and detailed analytics to ensure users not only learn but truly master their chosen skills.\n\nWhat sets SkillForge apart is our commitment to creating a sustainable learning environment. We understand that real skill development isn't about cramming information—it's about building lasting habits and maintaining consistent progress. Our platform's unique features, including adaptive learning paths and achievement systems, are designed to keep users motivated and engaged throughout their learning journey.\n\nAs we launch SkillForge, we're committed to continuously evolving and improving based on user feedback and the latest advances in learning science. Join us in this exciting journey to revolutionize skill development and make effective learning accessible to everyone.",
    date: "2024-03-15",
    readTime: "5 min read",
    url: "/blog/introducing-skillforge"
  },
  {
    title: "The Science Behind Effective Skill Acquisition: SkillForge's Methodology",
    description: "Dive deep into the research and scientific principles that power SkillForge's unique approach to learning and skill development.",
    content: "At SkillForge, our approach to skill development isn't just innovative—it's rooted in decades of cognitive science research and modern learning theories. This blog post explores the scientific foundations that make our platform uniquely effective.\n\nThe Pomodoro Technique, a cornerstone of our platform, has been proven to enhance focus and reduce mental fatigue. Research shows that structured work intervals, followed by brief breaks, optimize learning retention and maintain high levels of concentration. Our implementation of this technique is carefully calibrated to match individual learning patterns.\n\nProgress tracking and analytics aren't just features—they're powerful motivational tools backed by behavioral psychology. Studies have shown that visible progress markers and achievement systems trigger dopamine release, reinforcing positive learning behaviors. SkillForge's analytics dashboard is designed to capitalize on these psychological principles.\n\nOur platform's emphasis on consistent practice is supported by research in neuroplasticity—the brain's ability to form new neural connections through repeated exposure and practice. By combining spaced repetition with active recall exercises, SkillForge optimizes the learning process for long-term retention and skill mastery.\n\nAs we continue to evolve, our commitment to science-based learning methodologies remains unwavering. Stay tuned for more insights into how SkillForge is shaping the future of learning.",
    date: "2024-03-10",
    readTime: "6 min read",
    url: "/blog/science-of-learning"
  },
  {
    title: "The Future of Learning: How AI and Technology Are Transforming Skill Development",
    description: "Explore how emerging technologies and AI are reshaping the landscape of learning and skill acquisition, and how SkillForge is leading this transformation.",
    content: "The intersection of artificial intelligence and education is creating unprecedented opportunities for personalized learning experiences. As a new player in the educational technology space, SkillForge is at the forefront of this revolution, implementing cutting-edge technologies to enhance skill development.\n\nAI-driven personalization is transforming how we approach learning. Traditional one-size-fits-all methods are being replaced by adaptive systems that respond to individual learning patterns and preferences. While SkillForge is new to the market, our platform is built with the flexibility to incorporate these advancing technologies.\n\nThe future of learning will be increasingly data-driven, with analytics providing deeper insights into learning patterns and effectiveness. SkillForge's analytics dashboard is designed to evolve with these technological advances, offering users increasingly sophisticated insights into their learning journey.\n\nAs we look to the future, we're excited about the potential of emerging technologies like augmented reality and machine learning to further enhance skill development. While we're just beginning our journey, SkillForge is positioned to adapt and grow with these technological advances, always focusing on delivering the most effective learning experience possible.\n\nJoin us in exploring how technology is reshaping education and skill development. Together, we can build a future where effective learning is accessible to everyone.",
    date: "2024-03-05",
    readTime: "7 min read",
    url: "/blog/future-of-learning"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SkillForge Blog</h1>
          <p className="text-sage-600">Insights and strategies for effective skill development</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <Card key={blog.title} className="glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-sage-500">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <Button variant="outline" className="gap-2">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;