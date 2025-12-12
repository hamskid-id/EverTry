import { StatCard } from "@/types/data";

interface StatsCardsProps {
  stats: StatCard[];
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            background:
              "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -47.79%, rgba(204, 235, 235, 0) 100%)",
          }}
          className="rounded-lg p-6 border-t border-t-[#FFFFFF14]"
        >
          <div className="flex items-center gap-3">
            {stat.icon}
            <span className="text-3xl font-medium">{stat.count}</span>
          </div>
          <p className="text-sm text-white mt-4">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
