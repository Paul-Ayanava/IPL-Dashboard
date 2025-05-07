import { LiveMatchDetails } from "@/types/LiveMatch";
import { MatchSchedule } from "@/types/MatchSchedule";
import { TeamStanding } from "@/types/TeamStanding";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function fetchLiveMatch(): Promise<LiveMatchDetails | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/liveMatchDetails`);
    const { data }: ApiResponse<LiveMatchDetails> = await res.json();
    return data || null;
  } catch (error) {
    console.error("Error fetching live match:", error);
    return null;
  }
}

export async function fetchUpcomingMatches(): Promise<MatchSchedule[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/schedule`);
    const result = await res.json();
    return result || [];
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return [];
  }
}

export async function fetchStandings(): Promise<TeamStanding[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/standings`
    );
    const result = await res.json()
    return result || [];
  } catch (error) {
    console.error("Error fetching standings:", error);
    return [];
  }
}
