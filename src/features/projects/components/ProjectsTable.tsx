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
import { TABLE_COLUMNS } from '../services/table.service';

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
          {TABLE_COLUMNS.map((column) => (
            <TableHead key={column.key}>
              {column.sortable && onSort ? (
                <SortHeader
                  label={column.label}
                  sortKey={column.sortKey!}
                  currentSort={currentSort}
                  onSort={onSort}
                />
              ) : (
                column.label
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={TABLE_COLUMNS.length} className="text-center py-8">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={TABLE_COLUMNS.length} className="text-center py-8 text-red-500">
              Error loading projects: {error.message}
            </TableCell>
          </TableRow>
        ) : projects.length === 0 ? (
          <TableRow>
            <TableCell colSpan={TABLE_COLUMNS.length} className="text-center py-8 text-gray-500">
              No projects found
            </TableCell>
          </TableRow>
        ) : (
          projects.map((project) => (
            <TableRow key={project.pid}>
              {TABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.key}
                  className={column.key === 'progress' ? 'w-20 py-2' : ''}
                >
                  {column.formatter
                    ? column.formatter(project[column.key as keyof ProjectCardResponse], project)
                    : project[column.key as keyof ProjectCardResponse]}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);
