import MatchNotification from "../Notification";
import { Notification } from "@/types/Notification";

interface NotificationContainerProps {
  notifications: Notification[];
}

const NotificationContainer = ({ notifications }: NotificationContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      {notifications?.map(notification => (
        <MatchNotification key={notification.id} {...notification} />
      ))}
    </div>
  );
}

export default NotificationContainer