import type { LogOfRecentTaskTimesProps } from "../../types";

const LogOfRecentTaskTimes = ({
  recentTaskTimes
}: LogOfRecentTaskTimesProps) => {
  return (
    <div className="mt-8 max-h-56 overflow-y-auto px-8">
      {recentTaskTimes.map((t, i) => (
        <div key={i} className="flex shadow rounded px-8 py-4 mt-2">
          <p>
            <span className="text-green-600">{t.seconds}</span> seconds added to{" "}
            <span className="text-green-600">{t.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default LogOfRecentTaskTimes;
