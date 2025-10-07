import { Checkbox } from '../../../../components/ui/checkbox';
import { Label } from '../../../../components/ui/label';
import { PURPOSE_OPTIONS } from '../../../../constants/filters';
import type { FilterState } from '../../model/filter.model';

type Props = {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
};

export const PurposeFilter = ({ filters, onUpdateFilter }: Props) => {
  const handlePurposeChange = (purposeValue: string, checked: boolean) => {
    if (checked) {
      onUpdateFilter('investment_purpose', purposeValue);
    } else {
      onUpdateFilter('investment_purpose', undefined);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Pasirinkite tikslą</Label>
      <div className="grid grid-cols-1 gap-3">
        {PURPOSE_OPTIONS.map((purpose) => (
          <div key={purpose.value} className="flex items-center space-x-2">
            <Checkbox
              id={purpose.value}
              checked={filters.investment_purpose === purpose.value}
              onCheckedChange={(checked) => handlePurposeChange(purpose.value, checked as boolean)}
              className="h-4 w-4"
            />
            <Label htmlFor={purpose.value} className="text-sm font-normal cursor-pointer">
              {purpose.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
