import { useState, useRef, useEffect } from 'react';
import type { FilterState } from '../model/filter.model';
import { hasActiveFilters } from '../services/filter.service';

import { Filter, X, ChevronDown } from 'lucide-react';

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

  // Close dropdown when clicking outside
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
      {/* Filter Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[120px]"
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

      {/* Dropdown Panel with Accordion */}
      {isOpen && (
        <Card className="absolute top-full right-0 mt-1 w-[500px] shadow-lg border z-50 bg-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filtrai</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-[500px] overflow-y-auto">
            <Accordion type="multiple" defaultValue={['country']} className="w-full">
              {/* Country Section */}
              <AccordionItem value="country">
                <AccordionTrigger>Šalis</AccordionTrigger>
                <AccordionContent>
                  <LocationFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>

              {/* Rating Section */}
              <AccordionItem value="rating">
                <AccordionTrigger>Reitingas</AccordionTrigger>
                <AccordionContent>
                  <RatingFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>

              {/* Purpose Section */}
              <AccordionItem value="purpose">
                <AccordionTrigger>Tikslas</AccordionTrigger>
                <AccordionContent>
                  <PurposeFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>

              {/* Duration Section */}
              <AccordionItem value="duration">
                <AccordionTrigger>Kredito trukmė</AccordionTrigger>
                <AccordionContent>
                  <DurationFilter filters={filters} onUpdateFilter={updateFilter} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 mt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                disabled={!hasActiveFilters(filters)}
              >
                Valyti filtrus
              </Button>
              <Button size="sm" onClick={() => setIsOpen(false)}>
                Taikyti
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
