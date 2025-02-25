
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Headphones, BookOpen, Pencil, Mic } from "lucide-react";

const sections = {
  "Listening": {
    icon: Headphones,
    description: "The Listening section tests your ability to understand spoken English in various contexts.",
    duration: "30 minutes",
    number_of_questions: 40,
    sections: [
      {
        title: "Section 1",
        description: "A conversation between two people in a social context (e.g., booking a ticket, arranging a meeting).",
        type: "Multiple Choice, Short Answer"
      },
      {
        title: "Section 2",
        description: "A monologue in a social context (e.g., a speech, a public announcement).",
        type: "Multiple Choice, Short Answer"
      },
      {
        title: "Section 3",
        description: "A conversation between up to four people in an academic or training context.",
        type: "Multiple Choice, Matching, Sentence Completion"
      },
      {
        title: "Section 4",
        description: "A lecture or talk on an academic subject.",
        type: "Multiple Choice, Short Answer"
      }
    ]
  },
  "Reading": {
    icon: BookOpen,
    description: "The Reading section tests your ability to read and understand a range of texts.",
    duration: "60 minutes",
    number_of_questions: 40,
    sections: [
      {
        title: "Academic Reading",
        description: "Texts from books, journals, magazines, and newspapers on a variety of academic subjects.",
        type: "Multiple Choice, Matching, True/False/Not Given"
      },
      {
        title: "General Training Reading",
        description: "Texts from notices, advertisements, and books on everyday topics.",
        type: "Multiple Choice, Matching, Fill in the Blanks"
      }
    ]
  },
  "Writing": {
    icon: Pencil,
    description: "The Writing section tests your ability to write in English for different purposes.",
    duration: "60 minutes",
    tasks: [
      {
        title: "Task 1",
        description: "You are asked to describe, summarize, or explain information presented in a graph, table, chart, or diagram (Academic). For General Training, you may be asked to write a letter.",
        type: "Graph Description, Letter Writing"
      },
      {
        title: "Task 2",
        description: "You are asked to write an essay in response to a question or topic, presenting your opinion and supporting arguments.",
        type: "Essay Writing"
      }
    ]
  },
  "Speaking": {
    icon: Mic,
    description: "The Speaking section tests your ability to communicate effectively in English.",
    duration: "11–14 minutes",
    parts: [
      {
        title: "Part 1",
        description: "Introduction and interview, where you answer questions about yourself, family, home, work, and interests.",
        type: "Question & Answer"
      },
      {
        title: "Part 2",
        description: "You are given a topic card and have 1 minute to prepare a 1-2 minute talk on the topic.",
        type: "Monologue"
      },
      {
        title: "Part 3",
        description: "A discussion with the examiner about abstract issues related to the topic in Part 2.",
        type: "Discussion"
      }
    ]
  }
};

export function TestSections() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-8">IELTS Test Sections</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(sections).map(([name, section]) => {
          const Icon = section.icon;
          const items = section.sections || section.tasks || section.parts || [];
          
          return (
            <Card key={name} className="group">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">{section.duration}</Badge>
                      {section.number_of_questions && (
                        <Badge variant="outline">{section.number_of_questions} questions</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{section.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <Badge variant="secondary" className="mt-1">{item.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
