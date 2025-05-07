import { MatchSchedule } from "@/types/MatchSchedule";
import React from "react";

interface ScheduleCardProp {
  match: MatchSchedule;
}
const ScheduleCard = ({ match }: ScheduleCardProp) => {
  const { matchNumber, date, day, time, venue, team1, team2 } = match;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-md mx-auto">
      {/* Match header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">
            MATCH {matchNumber}
          </div>
          <div className="text-xs text-gray-500">
            {date}, {day} {day && "•"} {time}
          </div>
        </div>
      </div>

      {/* Venue */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <p className="text-xs font-medium text-gray-600">{venue}</p>
      </div>

      {/* Teams */}
      <div className="px-4 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">{team1}</span>
          <span className="text-xs text-gray-500">vs</span>
        </div>
        <div className="font-medium">{team2}</div>
      </div>
    </div>
  );
};

export default ScheduleCard;
