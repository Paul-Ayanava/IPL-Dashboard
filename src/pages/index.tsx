import Layout from "@/app/layout";
import { ScheduleTable } from "@/components/molecules/ScheduleTable";
import { LiveMatchCard } from "@/components/organisms/LiveMatchCard";
import { fetchLiveMatch, fetchUpcomingMatches } from "@/lib/api";
import { LiveMatchDetails } from "@/types/LiveMatch";
import { MatchSchedule } from "@/types/MatchSchedule";
import { GetStaticProps } from "next";

interface HomePageProps {
  liveMatch: LiveMatchDetails | null;
  upcomingMatches: MatchSchedule[];
}

export default function HomePage({
  liveMatch,
  upcomingMatches,
}: HomePageProps) {

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">IPL Home</h1>

        {liveMatch ? (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Live Match</h2>
            <LiveMatchCard match={liveMatch} />
          </section>
        ) : (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Next Matches</h2>
            <ScheduleTable matches={upcomingMatches?.slice(0, 3)} />
          </section>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [liveMatch, upcomingMatches] = await Promise.all([
      fetchLiveMatch(),
      fetchUpcomingMatches(),
    ]);
    return {
      props: {
        liveMatch,
        upcomingMatches: upcomingMatches || [],
      },
      revalidate: 30, // Revalidate every 30 seconds
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        liveMatch: null,
        upcomingMatches: [],
        lastUpdated: new Date().toISOString(),
      },
      revalidate: 60, // Retry after 1 minute if error
    };
  }
};
