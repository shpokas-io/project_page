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
  isLoading?: boolean;
  error?: Error | null;
};

export const ProjectsTable = ({
  projects,
  currentSort = null,
  onSort,
  isLoading = false,
  error = null,
}: Props) => (
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
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-red-500">
              Error loading projects: {error.message}
            </TableCell>
          </TableRow>
        ) : projects.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
              No projects found
            </TableCell>
          </TableRow>
        ) : (
          projects.map((p) => (
            <TableRow key={p.pid}>
              <TableCell className="font-medium">{p.project_name}</TableCell>
              <TableCell>{p.country ?? '-'}</TableCell>
              <TableCell>{p.basic_interest}%</TableCell>
              <TableCell>{p.initial_rating}</TableCell>
              <TableCell>{p.credit_duration}</TableCell>
              <TableCell className="capitalize">{p.status.replaceAll('_', ' ')}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);
