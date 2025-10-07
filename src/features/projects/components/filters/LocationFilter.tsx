import { Checkbox } from '../../../../components/ui/checkbox';
import { Label } from '../../../../components/ui/label';
import { COUNTRY_OPTIONS } from '../../../../constants/filters';
import type { FilterState } from '../../model/filter.model';

type Props = {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
};

export const LocationFilter = ({ filters, onUpdateFilter }: Props) => {
  const handleCountryChange = (countryValue: string, checked: boolean) => {
    if (checked) {
      onUpdateFilter('country', countryValue);
    } else {
      onUpdateFilter('country', undefined);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Pasirinkite šalį</Label>
      <div className="grid grid-cols-2 gap-3">
        {COUNTRY_OPTIONS.map((country) => (
          <div key={country.value} className="flex items-center space-x-2">
            <Checkbox
              id={country.value}
              checked={filters.country === country.value}
              onCheckedChange={(checked) => handleCountryChange(country.value, checked as boolean)}
              className="h-4 w-4"
            />
            <Label htmlFor={country.value} className="text-sm font-normal cursor-pointer">
              {country.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
