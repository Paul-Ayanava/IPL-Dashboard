import { Notification } from "@/types/Notification";

const MatchNotification = ({ type, message }: Notification) => {
  const bgColor =
    type === "wicket"
      ? "bg-red-500/90 dark:bg-red-700/90"
      : "bg-green-500/90 dark:bg-green-700/90";

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 transition-all animate-[slideIn_0.3s_ease-out]`}
    >
      <div className="font-bold text-lg">
        {type === "wicket" ? "🏏 WICKET!" : "💥 SIX!"}
      </div>
      <div className="text-sm">{message}</div>
    </div>
  );
};

export default MatchNotification
