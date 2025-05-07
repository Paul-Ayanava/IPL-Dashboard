import { MatchSchedule } from "@/types/MatchSchedule";
import ScheduleCard from "../ScheduleCard";
import { MatchScheduleRow } from "@/components/atoms/MatchScheduleRow";

interface ScheduleTableProps {
  matches: MatchSchedule[];
}

export const ScheduleTable = ({ matches }: ScheduleTableProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden divide-y divide-gray-200">
        {matches?.map((match) => (
          <ScheduleCard key={match.matchNumber} match={match} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Match
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teams
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Venue
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches?.map((match) => (
              <MatchScheduleRow key={match.matchNumber} match={match} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};