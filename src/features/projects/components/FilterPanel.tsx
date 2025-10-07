import { useState, useRef, useEffect } from 'react';
import type { FilterState } from '../model/filter.model';
import { Button } from '../../../components/ui/button';
import { hasActiveFilters } from '../services/filter.service';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { Checkbox } from '../../../components/ui/checkbox';
import { COUNTRY_OPTIONS, PURPOSE_OPTIONS, RATING_OPTIONS } from '../../../constants/filters';
import { Filter, X, ChevronDown } from 'lucide-react';

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

  const handleRatingChange = (rating: string, checked: boolean) => {
    const currentRatings = filters.initial_rating || [];
    const newRatings = checked
      ? [...currentRatings, rating]
      : currentRatings.filter((r) => r !== rating);

    updateFilter('initial_rating', newRatings);
  };

  const handleDurationChange = (field: 'min' | 'max', value: string) => {
    const currentDuration = filters.credit_duration || {};
    const numValue = value === '' ? undefined : Number(value);

    updateFilter('credit_duration', {
      ...currentDuration,
      [field]: numValue,
    });
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

      {isOpen && (
        <Card className="absolute top-full right-0 mt-1 w-[600px] shadow-lg border z-50 bg-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filtrai</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Šalis</Label>
                <Select
                  value={filters.country || 'all'}
                  onValueChange={(value) =>
                    updateFilter('country', value === 'all' ? undefined : value)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Pasirinkite šalį" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Visos šalys</SelectItem>
                    {COUNTRY_OPTIONS.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tikslas</Label>
                <Select
                  value={filters.purpose || 'all'}
                  onValueChange={(value) =>
                    updateFilter('purpose', value === 'all' ? undefined : value)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Pasirinkite tikslą" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Visi tikslai</SelectItem>
                    {PURPOSE_OPTIONS.map((purpose) => (
                      <SelectItem key={purpose.value} value={purpose.value}>
                        {purpose.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Kampanijos ID</Label>
                <Input
                  placeholder="Įveskite kampanijos ID"
                  value={filters.campaign_id || ''}
                  onChange={(e) => updateFilter('campaign_id', e.target.value || undefined)}
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Privatus ID</Label>
                <Input
                  placeholder="Įveskite privatų ID"
                  value={filters.private_id || ''}
                  onChange={(e) => updateFilter('private_id', e.target.value || undefined)}
                  className="h-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Kredito trukmė (mėnesiais)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.credit_duration?.min || ''}
                  onChange={(e) => handleDurationChange('min', e.target.value)}
                  className="h-9"
                />
                <span className="flex items-center text-sm text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.credit_duration?.max || ''}
                  onChange={(e) => handleDurationChange('max', e.target.value)}
                  className="h-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Reitingas</Label>
              <div className="grid grid-cols-5 gap-2">
                {RATING_OPTIONS.map((rating) => (
                  <div key={rating} className="flex items-center space-x-1">
                    <Checkbox
                      id={rating}
                      checked={(filters.initial_rating || []).includes(rating)}
                      onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor={rating} className="text-xs font-normal cursor-pointer">
                      {rating}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
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
