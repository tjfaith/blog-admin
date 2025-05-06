"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock API call
const fetchSettings = async () => {
  // In a real app, this would be an API call
  return {
    general: {
      siteName: "My Blog",
      siteDescription: "A blog about web development and design",
      siteUrl: "https://myblog.com",
      postsPerPage: 10,
    },
    seo: {
      metaTitle: "My Blog | Web Development and Design",
      metaDescription: "A blog about web development, design, and technology",
      ogImage: "/placeholder.svg",
      twitterHandle: "@myblog",
    },
    comments: {
      enabled: true,
      moderationEnabled: true,
      allowAnonymous: false,
    },
    social: {
      twitter: "https://twitter.com/myblog",
      facebook: "https://facebook.com/myblog",
      instagram: "https://instagram.com/myblog",
      linkedin: "https://linkedin.com/in/myblog",
    },
  }
}

export function SettingsForm() {
  const { toast } = useToast()

  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  })

  const { register: registerGeneral, handleSubmit: handleSubmitGeneral } = useForm({
    defaultValues: data?.general,
  })

  const { register: registerSeo, handleSubmit: handleSubmitSeo } = useForm({
    defaultValues: data?.seo,
  })

  const { register: registerComments, handleSubmit: handleSubmitComments } = useForm({
    defaultValues: data?.comments,
  })

  const { register: registerSocial, handleSubmit: handleSubmitSocial } = useForm({
    defaultValues: data?.social,
  })

  const saveSettings = async (data: any) => {
    // In a real app, this would be an API call
    console.log("Saving settings:", data)
    return true
  }

  const mutation = useMutation({
    mutationFn: saveSettings,
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully",
      })
    },
  })

  const onSubmitGeneral = (data: any) => {
    mutation.mutate({ general: data })
  }

  const onSubmitSeo = (data: any) => {
    mutation.mutate({ seo: data })
  }

  const onSubmitComments = (data: any) => {
    mutation.mutate({ comments: data })
  }

  const onSubmitSocial = (data: any) => {
    mutation.mutate({ social: data })
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-64 bg-gray-200 rounded w-full" />
      </div>
    )
  }

  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure the general settings for your blog</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitGeneral(onSubmitGeneral)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" {...registerGeneral("siteName", { required: true })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea id="siteDescription" {...registerGeneral("siteDescription")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input id="siteUrl" type="url" {...registerGeneral("siteUrl", { required: true })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postsPerPage">Posts Per Page</Label>
                <Input
                  id="postsPerPage"
                  type="number"
                  {...registerGeneral("postsPerPage", { required: true, min: 1 })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="seo">
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Configure the SEO settings for your blog</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitSeo(onSubmitSeo)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Default Meta Title</Label>
                <Input id="metaTitle" {...registerSeo("metaTitle")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Default Meta Description</Label>
                <Textarea id="metaDescription" {...registerSeo("metaDescription")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Default OG Image</Label>
                <Input id="ogImage" {...registerSeo("ogImage")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                <Input id="twitterHandle" {...registerSeo("twitterHandle")} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="comments">
        <Card>
          <CardHeader>
            <CardTitle>Comments Settings</CardTitle>
            <CardDescription>Configure the comments settings for your blog</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitComments(onSubmitComments)}>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="commentsEnabled">Enable Comments</Label>
                  <p className="text-sm text-muted-foreground">Allow visitors to comment on your posts</p>
                </div>
                <Switch id="commentsEnabled" {...registerComments("enabled")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="moderationEnabled">Enable Moderation</Label>
                  <p className="text-sm text-muted-foreground">Review comments before they are published</p>
                </div>
                <Switch id="moderationEnabled" {...registerComments("moderationEnabled")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowAnonymous">Allow Anonymous Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow visitors to comment without providing their name or email
                  </p>
                </div>
                <Switch id="allowAnonymous" {...registerComments("allowAnonymous")} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle>Social Media Settings</CardTitle>
            <CardDescription>Configure your social media profiles</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitSocial(onSubmitSocial)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input id="twitter" type="url" {...registerSocial("twitter")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input id="facebook" type="url" {...registerSocial("facebook")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input id="instagram" type="url" {...registerSocial("instagram")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input id="linkedin" type="url" {...registerSocial("linkedin")} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
