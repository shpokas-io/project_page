import { RATING_HIERARCHY } from '../constants/project.constants';
import type { ProjectCardResponse } from '../model/project.model';
import type { SortConfig } from '../model/sort.model';

const getRatingOrder = (rating: string): number => {
  const index = RATING_HIERARCHY.indexOf(rating as any);
  return index === -1 ? 999 : index;
};

const parseDuration = (duration: string | number | null | undefined): number => {
  if (!duration) return 0;

  const durationStr = String(duration);

  const match = durationStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export const sortProjectsClientSide = (
  projects: ProjectCardResponse[],
  sort: SortConfig | null,
): ProjectCardResponse[] => {
  if (!sort) return projects;

  return [...projects].sort((a, b) => {
    let comparison = 0;

    switch (sort.id) {
      case 'basic_interest':
        comparison = a.basic_interest - b.basic_interest;
        break;

      case 'initial_rating':
        const aRatingOrder = getRatingOrder(a.initial_rating);
        const bRatingOrder = getRatingOrder(b.initial_rating);
        comparison = bRatingOrder - aRatingOrder;
        break;

      case 'credit_duration':
        const aDuration = parseDuration(a.credit_duration);
        const bDuration = parseDuration(b.credit_duration);
        comparison = aDuration - bDuration;
        break;

      default:
        return 0;
    }

    return sort.desc ? -comparison : comparison;
  });
};
