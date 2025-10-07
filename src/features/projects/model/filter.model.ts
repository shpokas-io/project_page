export type FilterValue = string | number | string[] | { min?: number; max?: number };

export interface Filter {
  id: string;
  value: FilterValue;
}

export interface FilterState {
  country?: string;
  initial_rating?: string[];
  purpose?: string;
  credit_duration?: { min?: number; max?: number };
  campaign_id?: string;
  private_id?: string;
}

export const FILTER_IDS = {
  COUNTRY: 'country',
  INITIAL_RATING: 'initial_rating',
  PURPOSE: 'purpose',
  CREDIT_DURATION: 'credit_duration',
  CAMPAIGN_ID: 'campaign_id',
  PRIVATE_ID: 'private_id',
} as const;
