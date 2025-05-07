export enum TeamBattingStatus {
  BATTING = "BATTING",
  YET_TO_BAT = "YTB",
}

export interface TeamDetails {
  shortName: string;
}

export interface BattingTeam extends TeamDetails {
  status: TeamBattingStatus.BATTING;
  score: string;
  overs: string;
}

export interface YetToBatTeam extends TeamDetails {
  status: TeamBattingStatus.YET_TO_BAT;
}

export type Team = BattingTeam | YetToBatTeam;

export interface MatchScore {
  status: string;
  startTime: string;
  matchNumber: string;
  teamA: Team;
  teamB: Team;
  matchStatus: string;
}
