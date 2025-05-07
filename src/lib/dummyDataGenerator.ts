import { MatchSchedule } from "@/types/MatchSchedule";
import { TeamStanding } from "@/types/TeamStanding";

export const TEAMS = [
  "Chennai Super Kings",
  "Mumbai Indians",
  "Royal Challengers Bengaluru",
  "Kolkata Knight Riders",
  "Delhi Capitals",
  "Punjab Kings",
  "Rajasthan Royals",
  "Sunrisers Hyderabad",
  "Gujarat Titans",
  "Lucknow Super Giants",
];

const teamVenueMap: Record<string, string> = {
  "Chennai Super Kings": "Chennai",
  "Mumbai Indians": "Mumbai",
  "Royal Challengers Bengaluru": "Bengaluru",
  "Kolkata Knight Riders": "Kolkata",
  "Delhi Capitals": "Delhi",
  "Punjab Kings": "Mohali",
  "Rajasthan Royals": "Jaipur",
  "Sunrisers Hyderabad": "Hyderabad",
  "Gujarat Titans": "Ahmedabad",
  "Lucknow Super Giants": "Lucknow",
};

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function generateDummyMatches(): MatchSchedule[] {
  const matches: MatchSchedule[] = [];
  const now = new Date();

  // Generate matches for next 7 days
  for (let i = 0; i < 7; i++) {
    const matchDate = new Date(now);
    matchDate.setDate(now.getDate() + i);

    const team1 = TEAMS[Math.floor(Math.random() * TEAMS.length)];
    let team2 = TEAMS[Math.floor(Math.random() * TEAMS.length)];
    while (team2 === team1) {
      team2 = TEAMS[Math.floor(Math.random() * TEAMS.length)];
    }

    matches.push({
      matchNumber: `match-${i}`,
      team1,
      team2,
      date: matchDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      time: `7:30 PM`,
      venue: teamVenueMap[team1],
      day: weekdays[matchDate.getDay()],
    });
    matchDate.setDate(matchDate.getDate() + 1);
  }

  return matches;
}

export function generateDummyStandings(): TeamStanding[] {
  const standings: TeamStanding[] = [];

  // Shuffle teams for random order
  const shuffledTeams = [...TEAMS].sort(() => Math.random() - 0.5);

  shuffledTeams.forEach((team, index) => {
    const matches = 14;
    const wins = Math.floor(Math.random() * 10) + 4;
    const losses = matches - wins;
    const points = wins * 2;
    const netRunRate = Math.random() * 2 - 0.5; // Between -0.5 and 1.5

    standings.push({
      id: index + 1,
      position: index,
      team,
      matches,
      wins,
      losses,
      points,
      netRunRate: parseFloat(netRunRate.toFixed(3)),
    });
  });

  // Sort by points then NRR
  return standings
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.netRunRate - a.netRunRate;
    })
    .map((standing, index) => ({
      ...standing,
      position: index + 1,
    }));
}
