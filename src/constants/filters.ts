export const COUNTRY_OPTIONS = [
  { value: 'lt', label: 'Lithuania' },
  { value: 'ee', label: 'Estonia' },
  { value: 'es', label: 'Spain' },
  { value: 'lv', label: 'Latvia' },
];

export const RATING_OPTIONS = ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'BBB+', 'BBB', 'BBB-'];

export const PURPOSE_OPTIONS = [
  { value: 'real_estate_development', label: 'Real Estate Development' },
  { value: 'refinancing', label: 'Refinancing' },
  { value: 'working_capital', label: 'Working Capital' },
  { value: 'real_estate_acquisition', label: 'Real Estate Acquisition' },
  { value: 'other', label: 'Other' },
];

export const API_LIMITS = [10, 20, 50, 100] as const;

export const SORTABLE_COLUMNS = ['basic_interest', 'initial_rating', 'credit_duration'] as const;

export const FILTERABLE_COLUMNS = [
  'country',
  'initial_rating',
  'purpose',
  'credit_duration',
  'campaign_id',
  'private_id',
] as const;
