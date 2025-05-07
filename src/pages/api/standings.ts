import { generateDummyStandings } from "@/lib/dummyDataGenerator";
import { TeamStanding } from "@/types/TeamStanding";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamStanding[]>
) {
    const standings = generateDummyStandings()
    res.status(200).json(standings)
}