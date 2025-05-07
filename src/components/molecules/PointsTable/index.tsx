import { TeamStanding } from "@/types/TeamStanding";

interface PointsTableProps {
  standings: TeamStanding[];
}

export const PointsTable = ({ standings }: PointsTableProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pld</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">W</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">L</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pts</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">NRR</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standings.map((team) => (
              <tr key={team.id} className={team.position <= 4 ? 'bg-green-50' : ''}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">{team.position}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">{team.team}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">{team.matches}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">{team.wins}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">{team.losses}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-center">{team.points}</td>
                <td className={`px-4 py-4 whitespace-nowrap text-sm text-center ${
                  team.netRunRate > 0 ? 'text-green-600' : team.netRunRate < 0 ? 'text-red-600' : ''
                }`}>
                  {team.netRunRate.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {standings.map((team) => (
          <div key={team.id} className={`p-3 ${team.position <= 4 ? 'bg-green-50' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="font-medium">#{team.position} {team.team}</span>
              <span className="text-sm font-bold">{team.points} pts</span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2 text-sm">
              <div className="text-center">
                <div className="text-gray-500">Pld</div>
                <div>{team.matches}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500">W</div>
                <div>{team.wins}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500">L</div>
                <div>{team.losses}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500">NRR</div>
                <div className={
                  team.netRunRate > 0 ? 'text-green-600' : team.netRunRate < 0 ? 'text-red-600' : ''
                }>
                  {team.netRunRate.toFixed(3)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};