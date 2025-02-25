
import { TestSection } from "@/types/test";

export const mockTest: TestSection[] = [
  {
    name: "Listening",
    duration: 30,
    questions: [
      {
        id: 1,
        section: "Listening",
        question: "What is the main topic of the conversation?",
        options: ["Travel plans", "Work schedule", "Family reunion", "House moving"],
        correctAnswer: "Travel plans"
      },
      {
        id: 2,
        section: "Listening",
        question: "When does the speaker plan to leave?",
        options: ["Monday morning", "Tuesday afternoon", "Wednesday evening", "Thursday morning"],
        correctAnswer: "Monday morning"
      }
    ]
  },
  {
    name: "Reading",
    duration: 60,
    questions: [
      {
        id: 3,
        section: "Reading",
        question: "According to the passage, what is the primary cause of climate change?",
        options: ["Deforestation", "Industrial emissions", "Agricultural practices", "Urban development"],
        correctAnswer: "Industrial emissions"
      },
      {
        id: 4,
        section: "Reading",
        question: "What solution does the author propose?",
        options: ["Government regulation", "Individual action", "International cooperation", "Technological innovation"],
        correctAnswer: "International cooperation"
      }
    ]
  },
  {
    name: "Writing",
    duration: 60,
    questions: [
      {
        id: 5,
        section: "Writing",
        question: "Describe the graph showing global temperature changes over the past century. Write at least 150 words.",
        correctAnswer: "Response should include key trends, significant changes, and proper data interpretation."
      }
    ]
  },
  {
    name: "Speaking",
    duration: 15,
    questions: [
      {
        id: 6,
        section: "Speaking",
        question: "Talk about a memorable journey you have taken. Include where you went, why you went there, and what made it memorable.",
        correctAnswer: "Response should be clear, well-structured, and demonstrate good use of vocabulary and grammar."
      }
    ]
  }
];
