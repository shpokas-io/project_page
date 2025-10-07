import { ArrowPathIcon } from '@heroicons/react/24/outline';import { cn } from '../../lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <ArrowPathIcon
      role="status"
      aria-label="Loading"
      className={cn('h-4 w-4 animate-spin', className)}
      {...props}
    />
  );
}

export function SpinnerCustom() {
  return (
    <div className="flex justify-center items-center h-40">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
