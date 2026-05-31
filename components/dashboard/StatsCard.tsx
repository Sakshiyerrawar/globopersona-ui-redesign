interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  bgColor: string;
}

export default function StatsCard({
  title,
  value,
  description,
  bgColor,
}: StatsCardProps) {
  return (
    <div
      className={`rounded-3xl border p-6 ${bgColor}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[15px] font-medium text-gray-700">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            {value}
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            {description}
          </p>
        </div>

        <div className="text-green-600 font-semibold">
          ↗ 0
        </div>
      </div>

      <div className="mt-8 h-2 rounded-full bg-white/60" />
    </div>
  );
}