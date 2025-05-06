import { PostForm } from "@/components/posts/post-form"

export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <PostForm postId={params.id} />
    </div>
  )
}
