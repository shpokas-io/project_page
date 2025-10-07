export type SortConfig = {
  id: 'basic_interest' | 'initial_rating' | 'credit_duration';
  desc: boolean;
};

export type SortState = SortConfig | null;

export const ProjectStatus = {
  COMING_SOON: 'coming_soon',
  OPEN_FOR_INVESTMENTS: 'open_for_investments',
  FUNDED: 'funded',
  NOT_FUNDED: 'not_funded',
  CONFIRMED: 'confirmed',
  FINISHED: 'finished',
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const LoanRatio = {
  LTV: 'LTV',
  LTC: 'LTC',
} as const;
export type LoanRatio = (typeof LoanRatio)[keyof typeof LoanRatio];

export const SecurityMeasures = {
  FIRST_RANK_MORTGAGE: 'first_rank_mortgage',
  SECOND_RANK_MORTGAGE: 'second_rank_mortgage',
} as const;
export type SecurityMeasures = (typeof SecurityMeasures)[keyof typeof SecurityMeasures];

export interface ProjectCardResponse {
  status: ProjectStatus;
  basic_interest: number;
  pid: string;
  investment_purpose: string | null;
  max_bonus_interest: number | null;
  initial_rating: string;
  loan_ratio: LoanRatio;
  loan_ratio_external: number;
  loan_ratio_max: number;
  image_url: string | null;
  project_name: string;
  invested_amount: number;
  required_amount: number;
  days_to_get_money: string;
  funded_duration: string;
  investors: number;
  credit_duration: string;
  preview_url: string;
  country?: string;
  security_measures: SecurityMeasures;
}
