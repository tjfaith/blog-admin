"use client"

import { useQuery } from "@tanstack/react-query"
import { FileText, Eye, MessageSquare, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock API call
const fetchStats = async () => {
  // In a real app, this would be an API call
  return {
    posts: 24,
    views: 12453,
    comments: 89,
    trendingPosts: 3,
  }
}

export function DashboardStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchStats,
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-20 bg-gray-200 rounded-t-lg" />
            <CardContent className="h-16 bg-gray-100 rounded-b-lg" />
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: "Total Posts",
      value: data?.posts || 0,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Views",
      value: data?.views || 0,
      icon: Eye,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Comments",
      value: data?.comments || 0,
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "Trending Posts",
      value: data?.trendingPosts || 0,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} ${stat.color} p-2 rounded-full`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.title === "Total Views" ? new Intl.NumberFormat().format(stat.value) : stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
