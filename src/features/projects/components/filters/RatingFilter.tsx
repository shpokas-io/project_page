import { Checkbox } from '../../../../components/ui/checkbox';
import { Label } from '../../../../components/ui/label';
import { RATING_HIERARCHY } from '../../constants/project.constants';
import type { FilterState } from '../../model/filter.model';

type Props = {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
};

export const RatingFilter = ({ filters, onUpdateFilter }: Props) => {
  const handleRatingChange = (rating: string, checked: boolean) => {
    const currentRatings = filters.initial_rating || [];
    const newRatings = checked
      ? [...currentRatings, rating]
      : currentRatings.filter((r) => r !== rating);

    onUpdateFilter('initial_rating', newRatings);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Pasirinkite reitingus</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {RATING_HIERARCHY.map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <Checkbox
              id={rating}
              checked={(filters.initial_rating || []).includes(rating)}
              onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
              className="h-4 w-4"
            />
            <Label htmlFor={rating} className="text-sm font-normal cursor-pointer">
              {rating}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
