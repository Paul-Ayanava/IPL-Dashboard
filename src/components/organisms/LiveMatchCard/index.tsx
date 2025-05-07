import { LiveMatchDetails } from "@/types/LiveMatch"

interface LiveMatchCardProps {
  match: LiveMatchDetails
}

export function LiveMatchCard({ match }: LiveMatchCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          {match.team1} vs {match.team2}
        </h3>
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
          LIVE
        </span>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold">{match.currentScore}</p>
        <p className="text-gray-600">
            {match.tossWinner} won the toss and chose to {match.tossDecision} first
        </p>
        <p className="text-gray-600">
            {match.currentOver}.{match.currentBall} overs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">{match.teamBatting} Batting</h4>
          {match.batsmen.map(batsman => (
            <div key={batsman.id} className="flex justify-between py-2 border-b">
              <span className={batsman.isOut ? 'line-through' : ''}>
                {batsman.name}
              </span>
              <span>{batsman.runs} ({batsman.ballsFaced})</span>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-medium mb-2">Bowling</h4>
          {match.bowlers.map(bowler => (
            <div key={bowler.id} className="flex justify-between py-2 border-b">
              <span>{bowler.name}</span>
              <span>{bowler.overs}-{bowler.maidens}-{bowler.runsGiven}-{bowler.wickets}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}