import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentPosts } from "@/components/dashboard/recent-posts"
import { PopularPosts } from "@/components/dashboard/popular-posts"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPosts />
        <PopularPosts />
      </div>
    </div>
  )
}
