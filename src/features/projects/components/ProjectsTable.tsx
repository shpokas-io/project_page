import type { ActiveSorts, ProjectCardResponse } from '../model/project.model';
import { SortHeader } from './SortHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';

type Props = {
  projects: ProjectCardResponse[];
  activeSorts: ActiveSorts;
  onToggleSort: (key: string) => void;
};

export const ProjectsTable = ({ projects, activeSorts, onToggleSort }: Props) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <SortHeader
            label="Interest %"
            sortKey="basic_interest"
            activeSorts={activeSorts}
            onToggleSort={onToggleSort}
          />
          <SortHeader
            label="Rating"
            sortKey="initial_rating"
            activeSorts={activeSorts}
            onToggleSort={onToggleSort}
          />
          <SortHeader
            label="Credit Duration"
            sortKey="credit_duration"
            activeSorts={activeSorts}
            onToggleSort={onToggleSort}
          />
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((p) => (
          <TableRow key={p.pid}>
            <TableCell>{p.project_name}</TableCell>
            <TableCell>{p.country ?? '-'}</TableCell>
            <TableCell>{p.basic_interest}%</TableCell>
            <TableCell>{p.initial_rating}</TableCell>
            <TableCell>{p.credit_duration}</TableCell>
            <TableCell className="capitalize">{p.status.replaceAll('_', ' ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
