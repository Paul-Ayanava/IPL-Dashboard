import { MatchSchedule } from "@/types/MatchSchedule";

interface DesktopTableRowProps {
  match: MatchSchedule;
}

export const MatchScheduleRow = ({ match }: DesktopTableRowProps) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">Match {match.matchNumber}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>{match.day}, {match.date}</div>
        <div className="text-sm text-gray-500">{match.time}</div>
      </td>
      <td className="px-6 py-4">
        <div className="font-medium">{match.team1}</div>
        <div className="text-sm text-gray-500">vs</div>
        <div className="font-medium">{match.team2}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600">{match.venue}</div>
      </td>
    </tr>
  );
};