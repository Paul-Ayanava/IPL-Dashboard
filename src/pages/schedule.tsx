import { GetStaticProps } from "next";
import { fetchUpcomingMatches } from "@/lib/api";
import Layout from "@/app/layout";
import { MatchSchedule } from "@/types/MatchSchedule";
import { ScheduleTable } from "@/components/molecules/ScheduleTable";

interface SchedulePageProps {
  schedules: MatchSchedule[];
}

export default function StandingsPage({ schedules }: SchedulePageProps) {
  console.log("schedules", schedules);
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Upcoming Matches</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ScheduleTable matches={schedules} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<SchedulePageProps> = async () => {
  try {
    const upcomingMatches = await fetchUpcomingMatches();

    return {
      props: {
        schedules: upcomingMatches || [],
      },
      revalidate: 12 * 3600, // Revalidate every 12 hour
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        schedules: [],
      },
      revalidate: 300, // Retry after 5 minutes if error
    };
  }
};
