
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">ABS IELTS</span>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          Book now
        </Button>
      </div>
    </header>
  );
}
