"use client";
import { ScheduleTable } from "@/components/molecules/ScheduleTable";
import { LiveMatchCard } from "@/components/organisms/LiveMatchCard";
import { useNotifications } from "@/context/NotificationContext";
import { fetchUpcomingMatches } from "@/lib/api";
import { LiveMatchDetails, ScoreUpdate } from "@/types/LiveMatch";
import { MatchSchedule } from "@/types/MatchSchedule";
import { ConnectionStatus } from "@/types/Notification";
import { useEffect, useState } from "react";

export default function LiveMatch() {
  const [score, setScore] = useState<LiveMatchDetails | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [upcomingMatches, setUpcomingMatches] = useState<MatchSchedule[]>([]);

  const { addNotification } = useNotifications();

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/api/liveMatchWS`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setConnectionStatus("connected");
      console.log("WebSocket connected");
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: ScoreUpdate = JSON.parse(event.data);
        setScore(data.score);

        if (data.events) {
          if (data.events.wickets.length > 0) {
            data.events.wickets.forEach((wicket) => {
              addNotification({
                type: "wicket",
                message: wicket,
              });
            });
          }

          if (data.events.sixes.length > 0) {
            data.events.sixes.forEach((six) => {
              addNotification({
                type: "six",
                message: six,
              });
            });
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
    };

    ws.onclose = () => {
      setConnectionStatus("disconnected");
      console.log("WebSocket disconnected");

      setTimeout(() => {
        setConnectionStatus("reconnecting");
      }, 5000);
    };

    // return () => {
    //   ws.close(1000);
    // };
  }, [addNotification]);

  useEffect(() => {
    const getUpcomingMatchDetails = async () => {
      const upcomingMatchData = await fetchUpcomingMatches();
      setUpcomingMatches(upcomingMatchData?.slice(0, 3));
    };
    getUpcomingMatchDetails();
  }, []);

  if (connectionStatus === "connecting") {
    return <p>Loading...</p>;
  }

  if (!score) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Next Matches</h2>
        <ScheduleTable matches={upcomingMatches?.slice(0, 3)} />
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Live Match</h2>
      <LiveMatchCard match={score} />
    </section>
  );
}
