import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import type { ProjectCardResponse } from '../model/project.model';

export type TableColumn = {
  key: keyof ProjectCardResponse | 'progress' | 'image';
  label: string;
  sortable?: boolean;
  sortKey?: string;
  formatter?: (value: any, project: ProjectCardResponse) => React.ReactNode;
};

export const TABLE_COLUMNS: TableColumn[] = [
  {
    key: 'image',
    label: 'Img',
    formatter: (_, project) =>
      project.image_url ? (
        <img
          src={project.image_url}
          alt={project.project_name}
          className="w-12 h-12 object-cover rounded"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-xs text-gray-400">No img</span>
        </div>
      ),
  },
  {
    key: 'project_name',
    label: 'Pavadinimas',
    formatter: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: 'initial_rating',
    label: 'Reitingas',
    sortable: true,
    sortKey: 'initial_rating',
  },
  {
    key: 'country',
    label: 'Šalis',
    formatter: (value) => value ?? '-',
  },
  {
    key: 'loan_ratio_max',
    label: 'LTV',
    formatter: (value) => `${value}%`,
  },
  {
    key: 'invested_amount',
    label: 'Surinkta',
    formatter: (value) => `€${value.toLocaleString()}`,
  },
  {
    key: 'required_amount',
    label: 'Tikslas',
    formatter: (value) => `€${value.toLocaleString()}`,
  },
  {
    key: 'credit_duration',
    label: 'Laikas',
  },
  {
    key: 'investors',
    label: 'Investuotojai',
  },
  {
    key: 'days_to_get_money',
    label: 'Data',
  },
  {
    key: 'progress',
    label: 'Progresas',
    formatter: (_, project) => {
      const progress =
        project.required_amount > 0 ? (project.invested_amount / project.required_amount) * 100 : 0;
      const progressClamped = Math.min(progress, 100);

      return (
        <div className="w-16 h-16">
          <CircularProgressbar
            value={progressClamped}
            text={`${Math.round(progressClamped)}%`}
            styles={buildStyles({
              textSize: '20px',
              pathColor: '#2563eb',
              textColor: '#374151',
              trailColor: '#e5e7eb',
              backgroundColor: '#f9fafb',
            })}
          />
        </div>
      );
    },
  },
  {
    key: 'basic_interest',
    label: 'Interest rate',
    sortable: true,
    sortKey: 'basic_interest',
    formatter: (value) => `${value}%`,
  },
];
