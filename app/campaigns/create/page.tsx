import MainLayout from "@/components/layout/MainLayout";

export default function CreateCampaignPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl rounded-3xl border bg-white p-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Campaign
        </h1>

        <p className="mt-2 text-gray-500">
          Build and schedule your email campaign
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Campaign Name
            </label>

            <input
              type="text"
              placeholder="Summer Sale Campaign"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject Line
            </label>

            <input
              type="text"
              placeholder="Big discounts this weekend!"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Content
            </label>

            <textarea
              rows={8}
              placeholder="Write your email content..."
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white">
            Create Campaign
          </button>
        </div>
      </div>
    </MainLayout>
  );
}