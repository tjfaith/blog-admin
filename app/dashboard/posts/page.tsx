import { PostsTable } from "@/components/posts/posts-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link href="/dashboard/posts/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>
      <PostsTable />
    </div>
  )
}
