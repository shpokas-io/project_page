import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import type { FilterState } from '../../model/filter.model';

type Props = {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
};

export const DurationFilter = ({ filters, onUpdateFilter }: Props) => {
  const handleDurationChange = (field: 'min' | 'max', value: string) => {
    const currentDuration = filters.credit_duration || {};
    const numValue = value === '' ? undefined : Number(value);

    onUpdateFilter('credit_duration', {
      ...currentDuration,
      [field]: numValue,
    });
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Kredito trukmė (mėnesiais)</Label>
      <div className="flex gap-3 items-center">
        <Input
          type="number"
          placeholder="Min"
          value={filters.credit_duration?.min || ''}
          onChange={(e) => handleDurationChange('min', e.target.value)}
          className="h-9"
        />
        <span className="text-sm text-muted-foreground">iki</span>
        <Input
          type="number"
          placeholder="Max"
          value={filters.credit_duration?.max || ''}
          onChange={(e) => handleDurationChange('max', e.target.value)}
          className="h-9"
        />
      </div>
    </div>
  );
};
