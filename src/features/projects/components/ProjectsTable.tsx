import type { ProjectCardResponse } from '../model/project.model';

type Props = { projects: ProjectCardResponse[] };

export const ProjectsTable = ({ projects }: Props) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Country</th>
          <th className="p-2 text-left">Interest %</th>
          <th className="p-2 text-left">Rating</th>
          <th className="p-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.pid} className="border-t hover:bg-gray-50">
            <td className="p-2">{p.project_name}</td>
            <td className="p-2">{p.country ?? '-'}</td>
            <td className="p-2">{p.basic_interest}%</td>
            <td className="p-2">{p.initial_rating}</td>
            <td className="p-2 capitalize">{p.status.replaceAll('_', ' ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
