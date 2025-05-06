"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit2, Trash2 } from "lucide-react"

// Mock API call
const fetchRecentPosts = async () => {
  // In a real app, this would be an API call
  return [
    { id: "1", title: "Getting Started with Next.js", status: "published", date: "2023-05-15" },
    { id: "2", title: "React Best Practices", status: "draft", date: "2023-05-14" },
    { id: "3", title: "Tailwind CSS Tips and Tricks", status: "published", date: "2023-05-12" },
    { id: "4", title: "Building a Blog with Next.js", status: "draft", date: "2023-05-10" },
  ]
}

export function RecentPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["recentPosts"],
    queryFn: fetchRecentPosts,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded mb-2" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((post) => (
            <div key={post.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="inline-block h-1 w-1 rounded-full bg-gray-300" />
                  <span className={`capitalize ${post.status === "published" ? "text-green-500" : "text-amber-500"}`}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/posts/${post.id}/edit`}>
                  <Button variant="outline" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
