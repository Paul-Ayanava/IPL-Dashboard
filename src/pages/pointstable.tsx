import { GetStaticProps } from "next";
import { PointsTable } from "@/components/molecules/PointsTable";
import { TeamStanding } from "@/types/TeamStanding";
import { fetchStandings } from "@/lib/api";
import Layout from "@/app/layout";

interface StandingsPageProps {
  standings: TeamStanding[];
}

export default function StandingsPage({ standings }: StandingsPageProps) {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">IPL Standings</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <PointsTable standings={standings} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<StandingsPageProps> = async () => {
  try {
    const standings = await fetchStandings();

    return {
      props: {
        standings: standings || [],
      },
      revalidate: 12 * 3600, // Revalidate every 12 hour
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        standings: [],
      },
      revalidate: 300, // Retry after 5 minutes if error
    };
  }
};
