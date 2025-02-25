
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, CheckCircle, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockTest } from "@/data/testData";
import { TestSection, TestResult, UserAnswers } from "@/types/test";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function TestDetails() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    if (isTestStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft === 300) { // 5 minutes warning
        toast({
          title: "Time Warning",
          description: "5 minutes remaining in this section!",
          variant: "destructive",
        });
      }

      return () => clearInterval(timer);
    }
  }, [isTestStarted, timeLeft, toast]);

  const handleStartTest = () => {
    setIsTestStarted(true);
    setTimeLeft(mockTest[0].duration * 60);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextSection = () => {
    if (currentSection < mockTest.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setTimeLeft(mockTest[currentSection + 1].duration * 60);
    }
  };

  const calculateScore = (section: TestSection): number => {
    let correctAnswers = 0;
    section.questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / section.questions.length) * 9; // IELTS scoring is on a 9-band scale
  };

  const handleTestSubmit = () => {
    const sectionScores = {
      Listening: calculateScore(mockTest[0]),
      Reading: calculateScore(mockTest[1]),
      Writing: calculateScore(mockTest[2]),
      Speaking: calculateScore(mockTest[3]),
    };

    const overallScore = Number(
      (
        (sectionScores.Listening +
          sectionScores.Reading +
          sectionScores.Writing +
          sectionScores.Speaking) /
        4
      ).toFixed(1)
    );

    const result: TestResult = {
      score: overallScore,
      totalQuestions: mockTest.reduce((acc, section) => acc + section.questions.length, 0),
      sectionScores,
      completedAt: new Date().toISOString(),
    };

    setResult(result);
    setIsTestStarted(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold">IELTS Academic Test {id}</h1>
        </div>

        {!isTestStarted && !result && (
          <Card className="mb-8">
            <CardHeader className="flex-row items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Practice Test Overview</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary">Academic</Badge>
                  <Badge variant="outline">2 hours 45 minutes</Badge>
                </div>
              </div>
              <Button onClick={handleStartTest} className="bg-primary">
                Start Test
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {mockTest.map((section) => (
                  <div key={section.name} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{section.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {section.duration} minutes - {section.questions.length} questions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isTestStarted && (
          <Card className="mb-8">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{mockTest[currentSection].name} Section</h2>
                <p className="text-muted-foreground">
                  Question {currentSection + 1} of {mockTest.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {mockTest[currentSection].questions.map((question) => (
                <div key={question.id} className="space-y-4">
                  <h3 className="text-lg font-medium">{question.question}</h3>
                  {question.options ? (
                    <RadioGroup
                      value={userAnswers[question.id]}
                      onValueChange={(value) => handleAnswerChange(question.id, value)}
                    >
                      {question.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Textarea
                      value={userAnswers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="min-h-[200px]"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSection((prev) => Math.max(0, prev - 1))}
                  disabled={currentSection === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous Section
                </Button>
                {currentSection < mockTest.length - 1 ? (
                  <Button onClick={handleNextSection}>
                    Next Section <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleTestSubmit}>Submit Test</Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Test Results</h2>
                  <p className="text-muted-foreground">
                    Completed on {new Date(result.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Overall Band Score</h3>
                  <div className="text-4xl font-bold text-primary">
                    {result.score}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Section Scores</h3>
                  <div className="space-y-2">
                    {Object.entries(result.sectionScores).map(([section, score]) => (
                      <div key={section} className="flex justify-between">
                        <span>{section}</span>
                        <span className="font-medium">{score.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
