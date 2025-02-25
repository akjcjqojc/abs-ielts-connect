
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MessageSquare, Monitor, FileText } from "lucide-react";

interface MaterialCardProps {
  title: string;
  type: "academic" | "speaking" | "practice" | "skills";
  format?: "Computer" | "Paper";
}

const icons = {
  academic: GraduationCap,
  speaking: MessageSquare,
  practice: Monitor,
  skills: FileText,
};

export function MaterialCard({ title, type, format }: MaterialCardProps) {
  const Icon = icons[type];
  
  return (
    <Card className="relative overflow-hidden group card-hover animate-fade-in">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {format && (
            <Badge variant="secondary" className="font-medium">
              {format}
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        
        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white">
            Access now
          </Button>
          <Button variant="outline" className="w-full">
            View answers
          </Button>
        </div>
      </div>
    </Card>
  );
}
