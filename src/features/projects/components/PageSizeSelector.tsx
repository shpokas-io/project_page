import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { API_LIMITS } from '../constants/project.constants';

type Props = {
  currentLimit: number;
  onLimitChange: (limit: number) => void;
};

export const PageSizeSelector = ({ currentLimit, onLimitChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Rodyti po:</span>
      <Select
        value={currentLimit.toString()}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {API_LIMITS.map((limit) => (
            <SelectItem key={limit} value={limit.toString()}>
              {limit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
