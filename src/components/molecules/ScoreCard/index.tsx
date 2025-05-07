import React from 'react';

interface Player {
  name: string;
  status: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

interface Bowler {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  dots: number;
  fours: number;
  sixes: number;
  wides: number;
  noballs: number;
}

interface ScorecardProps {
  teamName: string;
  overs: string;
  total: string;
  runRate: string;
  batsmen: Player[];
  bowlers: Bowler[];
  extras: string;
  fallOfWickets?: string[];
  didNotBat?: string[];
}

const Scorecard: React.FC<ScorecardProps> = ({
  teamName,
  overs,
  total,
  runRate,
  batsmen,
  bowlers,
  extras,
  fallOfWickets,
  didNotBat,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-4xl mx-auto my-4">
      {/* Team Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-bold">
          {teamName} <span className="text-sm font-normal">({overs} maximum)</span>
        </h2>
      </div>

      {/* Batting Section */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold mb-2">Batting</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-xs text-left text-gray-500 border-b border-gray-200">
                <th className="pb-1 pr-4">Batter</th>
                <th className="pb-1 pr-4">Status</th>
                <th className="pb-1 text-right">R</th>
                <th className="pb-1 text-right">B</th>
                <th className="pb-1 text-right hidden sm:table-cell">4s</th>
                <th className="pb-1 text-right hidden sm:table-cell">6s</th>
                <th className="pb-1 text-right hidden sm:table-cell">SR</th>
              </tr>
            </thead>
            <tbody>
              {batsmen.map((player, index) => (
                <tr key={index} className="text-sm border-b border-gray-100 last:border-0">
                  <td className="py-2 pr-4">{player.name}</td>
                  <td className="py-2 pr-4 text-xs text-gray-600">{player.status}</td>
                  <td className="py-2 text-right">{player.runs}</td>
                  <td className="py-2 text-right">{player.balls}</td>
                  <td className="py-2 text-right hidden sm:table-cell">{player.fours}</td>
                  <td className="py-2 text-right hidden sm:table-cell">{player.sixes}</td>
                  <td className="py-2 text-right hidden sm:table-cell">{player.strikeRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extras and Total */}
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Extras: {extras}</span>
          <div className="text-right">
            <div className="font-medium">Total</div>
            <div className="text-xs text-gray-600">{overs} (RR: {runRate})</div>
            <div className="font-bold">{total}</div>
          </div>
        </div>
      </div>

      {/* Fall of Wickets */}
      {fallOfWickets && 
      <div className="px-4 py-2 border-b border-gray-200">
        <h4 className="text-sm font-semibold mb-1">Fall of wickets:</h4>
        <p className="text-xs text-gray-700">{fallOfWickets.join(', ')} • ©DRS</p>
      </div>}

      {/* Did Not Bat */}
      {didNotBat &&
      <div className="px-4 py-2 border-b border-gray-200">
        <h4 className="text-sm font-semibold mb-1">Did not bat:</h4>
        <p className="text-xs text-gray-700">{didNotBat.join(', ')}</p>
      </div>}

      {/* Bowling Section */}
      <div className="px-4 py-3">
        <h3 className="font-semibold mb-2">Bowling</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-xs text-left text-gray-500 border-b border-gray-200">
                <th className="pb-1 pr-4">Bowler</th>
                <th className="pb-1 text-right">O</th>
                <th className="pb-1 text-right">M</th>
                <th className="pb-1 text-right">R</th>
                <th className="pb-1 text-right">W</th>
                <th className="pb-1 text-right hidden sm:table-cell">ECON</th>
                <th className="pb-1 text-right hidden md:table-cell">0s</th>
                <th className="pb-1 text-right hidden md:table-cell">4s</th>
                <th className="pb-1 text-right hidden md:table-cell">6s</th>
                <th className="pb-1 text-right hidden lg:table-cell">WD</th>
                <th className="pb-1 text-right hidden lg:table-cell">NB</th>
              </tr>
            </thead>
            <tbody>
              {bowlers.map((bowler, index) => (
                <tr key={index} className="text-sm border-b border-gray-100 last:border-0">
                  <td className="py-2 pr-4">{bowler.name}</td>
                  <td className="py-2 text-right">{bowler.overs}</td>
                  <td className="py-2 text-right">{bowler.maidens}</td>
                  <td className="py-2 text-right">{bowler.runs}</td>
                  <td className="py-2 text-right">{bowler.wickets}</td>
                  <td className="py-2 text-right hidden sm:table-cell">{bowler.economy.toFixed(2)}</td>
                  <td className="py-2 text-right hidden md:table-cell">{bowler.dots}</td>
                  <td className="py-2 text-right hidden md:table-cell">{bowler.fours}</td>
                  <td className="py-2 text-right hidden md:table-cell">{bowler.sixes}</td>
                  <td className="py-2 text-right hidden lg:table-cell">{bowler.wides}</td>
                  <td className="py-2 text-right hidden lg:table-cell">{bowler.noballs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;