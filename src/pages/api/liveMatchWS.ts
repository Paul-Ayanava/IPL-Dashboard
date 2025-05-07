import { WebSocketServer, WebSocket } from "ws";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage, Server } from "http";
import { LiveMatchDetails, ScoreUpdate } from "@/types/LiveMatch";
import { getDummyLiveMatchDetails } from "@/lib/dummyMatchGenerator";
import { Duplex } from "stream";

// Extend the server to include our WebSocket server
interface WithWebSocket extends Server {
  wss?: WebSocketServer;
}

let previousData: LiveMatchDetails | null = null;
const clients = new Set<WebSocket>();

// Interval logic (should only be initialized once)
function startBroadcasting() {
  return setInterval(() => {
    try {
      const { data: currentMatchDetails } = getDummyLiveMatchDetails();

      const events: {
        wickets: string[];
        sixes: string[];
      } = { wickets: [], sixes: [] };

      if (currentMatchDetails && previousData) {
        if (currentMatchDetails.totalWickets > previousData.totalWickets) {
          events.wickets = [`${currentMatchDetails.teamBatting} lost a wicket`];
        }

        const runDiff = currentMatchDetails.totalRuns - previousData.totalRuns;
        if (runDiff === 6) {
          events.sixes = [`${currentMatchDetails.teamBatting} hit a six`];
        }
      }

      previousData = currentMatchDetails;

      const payload: ScoreUpdate = {
        score: currentMatchDetails,
        events:
          events.wickets.length || events.sixes.length ? events : undefined,
      };

      const message = JSON.stringify(payload);

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (err) {
      console.error("Broadcast error:", err);
    }
  }, 15000);
}

// Only run once
let interval: NodeJS.Timer | null = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) {
    console.error('Missing server instance &&&');
    res.status(500).send("Socket is not available");
    return;
  }
  console.log('*******')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const server: WithWebSocket = (res.socket as any).server as WithWebSocket;

  if (!server.wss) {
    console.log("Initializing WebSocket server...");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wss = new WebSocketServer({ noServer: true });

    server.on(
      "upgrade",
      (req: IncomingMessage, socket: Duplex, head: Buffer) => {
        console.log(`Incoming upgrade request for: ${req.url}`);
        if (req.url === "/api/liveMatchWS") {
          wss.handleUpgrade(req, socket, head, (ws) => {
            console.log('Handling WebSocket upgrade');
            wss.emit("connection", ws, req);
          });
        } else {
          console.log('Destroying socket****')
          socket.destroy()
        }
      }
    );

    wss.on("connection", (ws: WebSocket) => {
      console.log("[WebSocket] Client connected");
      clients.add(ws);

      // ws.on("close", (code, reason) => {
      //   console.log("&&&&&", code, JSON.stringify(reason));
      //   clients.delete(ws);
      // });
      ws.on("error", (err) => console.error("WebSocket error:", err));
    });
    if (!interval) {
      interval = startBroadcasting();
    }
    server.wss = wss;
  }

  res.status(200).end(); // Must respond to avoid hanging request
}
