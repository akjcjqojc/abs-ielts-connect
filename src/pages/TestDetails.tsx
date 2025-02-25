
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

type TestResult = {
  score: number;
  totalQuestions: number;
  completedAt: string;
};

export default function TestDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [result, setResult] = useState<TestResult | null>(null);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const handleStartTest = () => {
    setIsTestStarted(true);
    // In a real app, this would load the actual test questions
    console.log("Starting test:", id);
  };

  const handleViewAnswers = () => {
    // In a real app, this would open the PDF with answers
    console.log("Viewing answers for test:", id);
  };

  const handleTestSubmit = () => {
    // Simulating test completion
    const mockResult: TestResult = {
      score: 7.5,
      totalQuestions: 40,
      completedAt: new Date().toISOString(),
    };
    setResult(mockResult);
    setIsTestStarted(false);
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
                Access now
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Test Content</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete practice test with all four sections: Listening,
                      Reading, Writing, and Speaking
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Answer Key</h3>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm text-muted-foreground"
                      onClick={handleViewAnswers}
                    >
                      View detailed answers (PDF)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isTestStarted && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Practice Test</h2>
              <div className="space-y-8">
                {/* This would be replaced with actual test questions */}
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Sample test question would appear here...
                  </p>
                  <Button onClick={handleTestSubmit}>Submit Test</Button>
                </div>
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
                  <h3 className="font-medium mb-2">Questions Completed</h3>
                  <div className="text-4xl font-bold">
                    {result.totalQuestions}
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
