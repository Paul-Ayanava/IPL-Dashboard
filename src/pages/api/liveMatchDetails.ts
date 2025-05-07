import { getDummyLiveMatchDetails } from "@/lib/dummyMatchGenerator";
import { LiveMatchResponse } from "@/types/LiveMatch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LiveMatchResponse>
) {
  const liveMatchDetail = getDummyLiveMatchDetails();
  res.status(200).json(liveMatchDetail);
}
