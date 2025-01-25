import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes SkillForge different from other learning platforms?",
    answer: "SkillForge focuses on habit formation and practical skill development rather than just content consumption. Our platform combines proven learning techniques like the Pomodoro method with progress tracking and analytics to ensure consistent improvement."
  },
  {
    question: "How does the Pomodoro Timer help with learning?",
    answer: "Our advanced Pomodoro Timer is designed to optimize your focus and learning sessions. It includes customizable work periods, breaks, and sound notifications to help maintain productivity while preventing burnout."
  },
  {
    question: "Can I track multiple skills at once?",
    answer: "Yes! SkillForge allows you to track multiple skills simultaneously. Each skill has its own progress tracking, streaks, and analytics to help you stay organized and motivated across different learning goals."
  },
  {
    question: "Is SkillForge suitable for beginners?",
    answer: "Absolutely! SkillForge is designed for learners at all levels. Our platform helps you break down complex skills into manageable chunks and provides guidance on building sustainable learning habits."
  },
  {
    question: "How does streak tracking work?",
    answer: "Streaks are recorded when you complete learning sessions consistently. The system encourages daily practice while being flexible enough to accommodate your schedule, helping you build lasting habits."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-sage-600">Find answers to common questions about SkillForge</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;