
import { Header } from "@/components/Header";
import { SearchSection } from "@/components/SearchSection";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { TestSections } from "@/components/TestSections";
import { FilterProvider } from "@/contexts/FilterContext";
import { useFilters } from "@/contexts/FilterContext";
import { Material } from "@/types/filters";

const materials: Material[] = [
  {
    title: "IELTS Academic Test Preparation",
    type: "academic",
    materialType: "IELTS practice test",
    topic: "Preparation",
    testType: "Academic & Academic UKVI",
    testSkill: "Reading",
    bandScore: "Band 7",
    format: "Computer"
  },
  {
    title: "Improve your IELTS Speaking score",
    type: "speaking",
    materialType: "IELTS video",
    topic: "Preparation",
    testType: "Academic & Academic UKVI",
    testSkill: "Speaking",
    bandScore: "Band 6",
  },
  {
    title: "Free practice test - Speaking Part 2",
    type: "practice",
    materialType: "IELTS practice test",
    topic: "Test Day",
    testType: "General Training",
    testSkill: "Speaking",
    bandScore: "Band 5",
    format: "Paper"
  },
  {
    title: "Life Skills A1 - Sample task A",
    type: "skills",
    materialType: "IELTS article",
    topic: "Preparation",
    testType: "Life Skills A1",
    testSkill: "Speaking",
    bandScore: "Band 1 to 4",
    format: "Paper"
  },
];

function MaterialsList() {
  const { searchQuery, activeFilters } = useFilters();
  
  const filteredMaterials = materials.filter(material => {
    // Search query filter
    if (searchQuery && !material.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply each filter category
    for (const [category, selectedValues] of Object.entries(activeFilters)) {
      if (selectedValues.length > 0) {
        const materialValue = material[category as keyof Material];
        if (!materialValue || !selectedValues.includes(materialValue)) {
          return false;
        }
      }
    }

    return true;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {filteredMaterials.map((material, index) => (
        <MaterialCard key={index} {...material} />
      ))}
    </div>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Explore our official ABS IELTS preparation materials
          </h1>
          <p className="text-xl text-muted-foreground">
            Prepare for success with our IELTS test preparation materials. Find practice tests, masterclasses, podcasts, videos, articles and more.
          </p>
        </div>

        <FilterProvider>
          <SearchSection />

          <div className="mt-16 space-y-16">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">IELTS Practice tests</h2>
                <Button variant="ghost" className="gap-2">
                  Sort
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
              
              <MaterialsList />
            </section>

            <TestSections />
          </div>
        </FilterProvider>
      </main>
    </div>
  );
};

export default Index;
