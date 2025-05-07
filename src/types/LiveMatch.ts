export interface Batsman {
  id: string;
  name: string;
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  isOut: boolean;
}

export interface Bowler {
  id: string;
  name: string;
  overs: number;
  maidens: number;
  runsGiven: number;
  wickets: number;
  economy: number;
}

export interface LiveMatchDetails {
  matchId: string;
  team1: string;
  team2: string;
  tossWinner: string;
  tossDecision: "bat" | "bowl";
  currentInnings: 1 | 2;
  currentScore: string;
  currentOver: number;
  currentBall: number;
  totalRuns: number;
  totalWickets: number;
  batsmen: Batsman[];
  bowlers: Bowler[];
  lastWicket: string | null;
  partnership: string;
  requiredRunRate: number | null;
  matchStatus: "live" | "innings break" | "completed";
  lastUpdated: string;
  teamBatting: string;
}

export interface LiveMatchResponse {
  data: LiveMatchDetails | null;
  meta: {
    isLive: boolean;
    message: string;
    currentTime: string;
  };
}

export interface ScoreUpdate {
  score: LiveMatchDetails | null;
  events?: {
    wickets: string[];
    sixes: string[];
  };
}
