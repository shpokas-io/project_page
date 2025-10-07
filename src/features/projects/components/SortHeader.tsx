import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { SortState } from '../model/sort.model';

type Props = {
  label: string;
  sortKey: string;
  currentSort: SortState;
  onSort: (sortKey: string) => void;
  className?: string;
};

export const SortHeader = ({ label, sortKey, currentSort, onSort, className }: Props) => {
  const isActive = currentSort?.id === sortKey;
  const isDesc = isActive && currentSort?.desc;

  return (
    <button
      onClick={() => onSort(sortKey)}
      className={cn(
        'flex items-center gap-1 hover:text-foreground text-left font-medium transition-colors',
        isActive ? 'text-foreground' : 'text-muted-foreground',
        className,
      )}
    >
      {label}
      <div className="flex flex-col">
        <ChevronUp
          className={cn(
            'h-3 w-3 transition-colors',
            isActive && !isDesc ? 'text-primary' : 'text-muted-foreground/30',
          )}
        />
        <ChevronDown
          className={cn(
            'h-3 w-3 -mt-1 transition-colors',
            isActive && isDesc ? 'text-primary' : 'text-muted-foreground/30',
          )}
        />
      </div>
    </button>
  );
};
