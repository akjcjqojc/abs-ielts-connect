
export interface TestQuestion {
  id: number;
  section: "Listening" | "Reading" | "Writing" | "Speaking";
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface TestSection {
  name: "Listening" | "Reading" | "Writing" | "Speaking";
  duration: number; // in minutes
  questions: TestQuestion[];
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  sectionScores: {
    [key in "Listening" | "Reading" | "Writing" | "Speaking"]: number;
  };
  completedAt: string;
}

export interface UserAnswers {
  [questionId: number]: string;
}
