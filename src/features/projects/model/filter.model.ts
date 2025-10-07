export type FilterValue = string | number | string[] | { min?: number; max?: number };

export interface Filter {
  id: string;
  value: FilterValue;
}

export interface FilterState {
  country?: string;
  initial_rating?: string[];
  investment_purpose?: string;
  credit_duration?: { min?: number; max?: number };
}

export const FILTER_IDS = {
  COUNTRY: 'country',
  INITIAL_RATING: 'initial_rating',
  INVESTMENT_PURPOSE: 'investment_purpose',
  CREDIT_DURATION: 'credit_duration',
} as const;
