export type SortConfig = {
  id: 'basic_interest' | 'initial_rating' | 'credit_duration';
  desc: boolean;
};

export type SortState = SortConfig | null;
