import Layout from "@/app/layout";
import LiveMatch from "@/components/organisms/LiveMatch";
import { NotificationProvider } from "@/context/NotificationContext";

export default function LiveMatchPage() {
  return (
    <Layout>
      <NotificationProvider>
        <LiveMatch />
      </NotificationProvider>
    </Layout>
  );
}
