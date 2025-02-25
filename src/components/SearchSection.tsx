
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/contexts/FilterContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MaterialType, Topic, TestType, TestSkill, BandScore, TestFormat } from "@/types/filters";

const filterOptions = {
  materialType: ["IELTS podcast", "IELTS video", "IELTS article", "IELTS practice test"] as MaterialType[],
  topic: ["Band Scores", "Immigration", "Preparation", "Results", "Test Day"] as Topic[],
  testType: ["Academic & Academic UKVI", "General Training", "Life Skills A1", "Life Skills A2", "Life Skills B1"] as TestType[],
  testSkill: ["Listening", "Reading", "Writing", "Speaking"] as TestSkill[],
  bandScore: ["Band 1 to 4", "Band 5", "Band 6", "Band 7", "Band 8"] as BandScore[],
  testFormat: ["On paper", "On computer"] as TestFormat[],
};

export function SearchSection() {
  const { searchQuery, setSearchQuery, activeFilters, setFilter, clearFilters } = useFilters();

  const handleFilterToggle = (category: keyof typeof filterOptions, value: string) => {
    const currentFilters = activeFilters[category];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(v => v !== value)
      : [...currentFilters, value];
    setFilter(category, newFilters);
  };

  const getActiveFilterCount = (category: keyof typeof filterOptions) => {
    return activeFilters[category].length;
  };

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          className="pl-10 pr-4 h-12 rounded-full border-gray-200"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchQuery('')}
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {Object.entries(activeFilters).some(([_, values]) => values.length > 0) && (
          <Button 
            variant="outline"
            size="sm"
            className="rounded-full flex items-center gap-2"
            onClick={clearFilters}
          >
            Clear all
            <X size={14} />
          </Button>
        )}
        
        {Object.entries(filterOptions).map(([category, options]) => (
          <Popover key={category}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                {category.replace(/([A-Z])/g, ' $1').trim()}
                {getActiveFilterCount(category as keyof typeof filterOptions) > 0 && 
                  ` (${getActiveFilterCount(category as keyof typeof filterOptions)})`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="grid gap-2">
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category}-${option}`}
                        checked={activeFilters[category as keyof typeof filterOptions].includes(option)}
                        onCheckedChange={() => handleFilterToggle(category as keyof typeof filterOptions, option)}
                      />
                      <Label htmlFor={`${category}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
