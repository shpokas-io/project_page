import { useState, useRef, useEffect } from 'react';
import type { FilterState } from '../model/filter.model';
import { hasActiveFilters } from '../services/filter.service';

import { FunnelIcon as Filter, XMarkIcon as X, ChevronDownIcon as ChevronDown } from '@heroicons/react/24/outline';
import { LocationFilter } from './filters/LocationFilter';
import { RatingFilter } from './filters/RatingFilter';
import { PurposeFilter } from './filters/PurposeFilter';
import { DurationFilter } from './filters/DurationFilter';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';

type FilterPanelProps = {
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  filters: FilterState;
};

export const FilterPanel = ({ onFiltersChange, onReset, filters }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return value.min !== undefined || value.max !== undefined;
    }
    return value !== undefined && value !== null && value !== '';
  }).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[120px] bg-white border-pink-200 hover:bg-pink-50"
      >
        <Filter className="w-4 h-4" />
        Filtrai
        {activeFiltersCount > 0 && (
          <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs min-w-[18px] h-[18px] flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-1 w-[380px] shadow-xl border z-50 bg-white/95 backdrop-blur-sm border-pink-200">
          <CardHeader className="pb-3 bg-white/90">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-purple-900">Filtrai</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="hover:bg-pink-100">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-[500px] overflow-y-auto bg-white/90">
            <Accordion type="multiple" defaultValue={['country']} className="w-full">
              {/* Country Section */}
              <AccordionItem value="country">
                <AccordionTrigger className="text-purple-800 hover:text-pink-600">Šalis</AccordionTrigger>
                <AccordionContent className="bg-white/80 rounded-md p-3">
                  <LocationFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>

              {/* Rating Section */}
              <AccordionItem value="rating">
                <AccordionTrigger className="text-purple-800 hover:text-pink-600">Reitingas</AccordionTrigger>
                <AccordionContent className="bg-white/80 rounded-md p-3">
                  <RatingFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>

              {/* Purpose Section */}
              <AccordionItem value="purpose">
                <AccordionTrigger className="text-purple-800 hover:text-pink-600">Tikslas</AccordionTrigger>
                <AccordionContent className="bg-white/80 rounded-md p-3">
                  <PurposeFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>

              {/* Duration Section */}
              <AccordionItem value="duration">
                <AccordionTrigger className="text-purple-800 hover:text-pink-600">Kredito trukmė</AccordionTrigger>
                <AccordionContent className="bg-white/80 rounded-md p-3">
                  <DurationFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 mt-4 border-t border-pink-200 bg-white/90 -mx-6 px-6 -mb-6 pb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                disabled={!hasActiveFilters(filters)}
                className="border-pink-300 text-purple-700 hover:bg-pink-50 flex-1"
              >
                Valyti filtrus
              </Button>
              <Button 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-primary/90 text-white flex-1"
              >
                Išsaugoti filtrus
                
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};