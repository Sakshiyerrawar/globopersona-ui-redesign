const campaigns = [
  {
    name: "Summer Launch Campaign",
    status: "Active",
    sent: "2,450",
  },
  {
    name: "Black Friday Sale",
    status: "Draft",
    sent: "1,120",
  },
  {
    name: "Winter Product Update",
    status: "Completed",
    sent: "5,430",
  },
];

export default function RecentCampaigns() {
  return (
    <div className="rounded-3xl border bg-white p-7">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Recent Campaigns
        </h2>

        <button className="text-sm font-semibold text-blue-600">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.name}
            className="flex items-center justify-between rounded-2xl border bg-gray-50 p-5"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {campaign.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Emails Sent: {campaign.sent}
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              {campaign.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}