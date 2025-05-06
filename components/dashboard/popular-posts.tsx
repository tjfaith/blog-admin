"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

// Mock API call
const fetchPopularPosts = async () => {
  // In a real app, this would be an API call
  return [
    { id: "1", title: "Getting Started with Next.js", views: 1245 },
    { id: "2", title: "React Best Practices", views: 987 },
    { id: "3", title: "Tailwind CSS Tips and Tricks", views: 756 },
    { id: "4", title: "Building a Blog with Next.js", views: 543 },
  ]
}

export function PopularPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["popularPosts"],
    queryFn: fetchPopularPosts,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Posts</CardTitle>
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
        <CardTitle>Popular Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((post) => (
            <div key={post.id} className="flex items-center justify-between">
              <div className="font-medium">{post.title}</div>
              <div className="flex items-center gap-1 text-gray-500">
                <Eye className="h-4 w-4" />
                <span>{new Intl.NumberFormat().format(post.views)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
