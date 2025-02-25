
import React, { createContext, useContext, useState } from 'react';
import { Filters } from '@/types/filters';

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: Filters;
  setFilter: (category: keyof Filters, values: any[]) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    materialType: [],
    topic: [],
    testType: [],
    testSkill: [],
    bandScore: [],
    testFormat: [],
  });

  const setFilter = (category: keyof Filters, values: any[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: values,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      materialType: [],
      topic: [],
      testType: [],
      testSkill: [],
      bandScore: [],
      testFormat: [],
    });
    setSearchQuery('');
  };

  return (
    <FilterContext.Provider value={{
      searchQuery,
      setSearchQuery,
      activeFilters,
      setFilter,
      clearFilters,
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
