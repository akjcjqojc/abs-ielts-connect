
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const filters = [
  { label: "Material types (1)", key: "material" },
  { label: "Topic", key: "topic" },
  { label: "Test type", key: "test-type" },
  { label: "Test skill", key: "test-skill" },
  { label: "Band score", key: "band-score" },
  { label: "Test format", key: "test-format" },
];

export function SearchSection() {
  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          className="pl-10 pr-4 h-12 rounded-full border-gray-200"
          placeholder="Search..."
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline"
          size="sm"
          className="rounded-full flex items-center gap-2"
        >
          Clear all
          <X size={14} />
        </Button>
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
