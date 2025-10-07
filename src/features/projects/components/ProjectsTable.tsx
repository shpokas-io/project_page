import type { ProjectCardResponse, SortState } from '../model/project.model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { SortHeader } from './SortHeader';

type Props = {
  projects: ProjectCardResponse[];
  currentSort?: SortState;
  onSort?: (sortKey: string) => void;
};

export const ProjectsTable = ({ projects, currentSort = null, onSort }: Props) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>
            {onSort ? (
              <SortHeader
                label="Basic Interest"
                sortKey="basic_interest"
                currentSort={currentSort}
                onSort={onSort}
              />
            ) : (
              'Basic Interest'
            )}
          </TableHead>
          <TableHead>
            {onSort ? (
              <SortHeader
                label="Initial Rating"
                sortKey="initial_rating"
                currentSort={currentSort}
                onSort={onSort}
              />
            ) : (
              'Initial Rating'
            )}
          </TableHead>
          <TableHead>
            {onSort ? (
              <SortHeader
                label="Credit Duration"
                sortKey="credit_duration"
                currentSort={currentSort}
                onSort={onSort}
              />
            ) : (
              'Credit Duration'
            )}
          </TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((p) => (
          <TableRow key={p.pid}>
            <TableCell className="font-medium">{p.project_name}</TableCell>
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
