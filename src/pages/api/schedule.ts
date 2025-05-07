import { generateDummyMatches } from "@/lib/dummyDataGenerator";
import { MatchSchedule } from "@/types/MatchSchedule";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchSchedule[]>
) {
  const schedule = generateDummyMatches();
  res.status(200).json(schedule);
}
