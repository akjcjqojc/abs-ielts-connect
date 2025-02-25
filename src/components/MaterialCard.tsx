
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MessageSquare, Monitor, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Material } from "@/types/filters";

const icons = {
  academic: GraduationCap,
  speaking: MessageSquare,
  practice: Monitor,
  skills: FileText,
};

export function MaterialCard({ 
  title, 
  type, 
  format,
  materialType,
  topic,
  testType,
  testSkill,
  bandScore 
}: Material) {
  const Icon = icons[type];
  const navigate = useNavigate();
  
  const handleAccessClick = () => {
    // For demo purposes, we'll use a fixed ID of 1
    navigate(`/test/1`);
  };
  
  return (
    <Card className="relative overflow-hidden group card-hover animate-fade-in">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {format && (
            <Badge variant="secondary" className="font-medium">
              {format === "Computer" ? "On computer" : "On paper"}
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        
        {(materialType || topic || testType || testSkill || bandScore) && (
          <div className="flex flex-wrap gap-2">
            {materialType && <Badge variant="outline">{materialType}</Badge>}
            {testSkill && <Badge variant="outline">{testSkill}</Badge>}
            {bandScore && <Badge variant="outline">{bandScore}</Badge>}
          </div>
        )}
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            onClick={handleAccessClick}
          >
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
