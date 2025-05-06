"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/posts/rich-text-editor"
import { MediaSelector } from "@/components/media/media-selector"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Mock API calls
const fetchPost = async (id: string) => {
  // In a real app, this would be an API call
  return {
    id,
    title: "Getting Started with Next.js",
    content: "<p>This is a sample post content with <strong>rich text</strong> formatting.</p>",
    excerpt: "Learn how to get started with Next.js, the React framework for production.",
    featuredImage: "/placeholder.svg",
    category: "development",
    tags: ["nextjs", "react", "tutorial"],
    status: "published",
    seo: {
      title: "Getting Started with Next.js - Blog",
      description: "Learn how to get started with Next.js, the React framework for production.",
      keywords: "nextjs, react, tutorial",
    },
  }
}

const fetchCategories = async () => {
  // In a real app, this would be an API call
  return [
    { id: "development", name: "Development" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "business", name: "Business" },
  ]
}

export function PostForm({ postId }: { postId?: string }) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      category: "",
      status: "draft",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    },
  })

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId as string),
    enabled: !!postId,
  })

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  useEffect(() => {
    if (post) {
      setValue("title", post.title)
      setValue("excerpt", post.excerpt)
      setValue("category", post.category)
      setValue("status", post.status)
      setValue("seoTitle", post.seo.title)
      setValue("seoDescription", post.seo.description)
      setValue("seoKeywords", post.seo.keywords)
      setContent(post.content)
      setSelectedImage(post.featuredImage)
      setSelectedTags(post.tags)
    }
  }, [post, setValue])

  const savePost = async (data: any) => {
    // In a real app, this would be an API call
    console.log("Saving post:", {
      ...data,
      content,
      featuredImage: selectedImage,
      tags: selectedTags,
    })
    return true
  }

  const mutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      router.push("/dashboard/posts")
    },
  })

  const onSubmit = (data: any) => {
    mutation.mutate(data)
  }

  if (isLoadingPost && postId) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-64 bg-gray-200 rounded w-full" />
      </div>
    )
  }

  const availableTags = [
    "nextjs",
    "react",
    "javascript",
    "typescript",
    "tutorial",
    "design",
    "css",
    "tailwind",
    "performance",
    "seo",
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter post title" {...register("title", { required: true })} />
                {errors.title && <p className="text-sm text-red-500">Title is required</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" placeholder="Enter a short excerpt" {...register("excerpt")} />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor value={content} onChange={setContent} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input id="seoTitle" placeholder="SEO Title" {...register("seoTitle")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea id="seoDescription" placeholder="Meta description" {...register("seoDescription")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoKeywords">Keywords</Label>
                <Input id="seoKeywords" placeholder="Keywords separated by commas" {...register("seoKeywords")} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={watch("status")} onValueChange={(value) => setValue("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : postId ? "Update Post" : "Create Post"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={watch("category")}
                onValueChange={(value) => setValue("category", value)}
                disabled={isLoadingCategories}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTags([...selectedTags, tag])
                        } else {
                          setSelectedTags(selectedTags.filter((t) => t !== tag))
                        }
                      }}
                    />
                    <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <MediaSelector selectedImage={selectedImage} onSelect={setSelectedImage} />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
