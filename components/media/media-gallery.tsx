"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { MoreVertical, Trash2, Download, Copy, Search } from "lucide-react"
import { formatBytes } from "@/lib/utils"

// Mock API call
const fetchMedia = async () => {
  // In a real app, this would be an API call
  return [
    { id: "1", url: "/placeholder.svg", name: "Image 1", type: "image/jpeg", size: 1024 * 1024, date: "2023-05-15" },
    { id: "2", url: "/placeholder.svg", name: "Image 2", type: "image/png", size: 512 * 1024, date: "2023-05-14" },
    { id: "3", url: "/placeholder.svg", name: "Image 3", type: "image/jpeg", size: 2048 * 1024, date: "2023-05-12" },
    { id: "4", url: "/placeholder.svg", name: "Image 4", type: "image/png", size: 768 * 1024, date: "2023-05-10" },
    { id: "5", url: "/placeholder.svg", name: "Image 5", type: "image/jpeg", size: 1536 * 1024, date: "2023-05-08" },
    { id: "6", url: "/placeholder.svg", name: "Image 6", type: "image/png", size: 896 * 1024, date: "2023-05-06" },
    { id: "7", url: "/placeholder.svg", name: "Image 7", type: "image/jpeg", size: 1280 * 1024, date: "2023-05-04" },
    { id: "8", url: "/placeholder.svg", name: "Image 8", type: "image/png", size: 640 * 1024, date: "2023-05-02" },
  ]
}

export function MediaGallery() {
  const [search, setSearch] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: fetchMedia,
  })

  const filteredMedia = data?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search media..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <CardFooter className="h-12 bg-gray-100" />
            </Card>
          ))}
        </div>
      ) : filteredMedia?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No media found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia?.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    onClick={() => setSelectedImage(item.id)}
                  />
                </div>
              </CardContent>
              <CardFooter className="p-2 flex justify-between items-center">
                <div className="truncate text-sm">{item.name}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{data?.find((item) => item.id === selectedImage)?.name}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image
                src={data?.find((item) => item.id === selectedImage)?.url || "/placeholder.svg"}
                alt={data?.find((item) => item.id === selectedImage)?.name || "Image"}
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">File Information</h3>
                <div className="mt-2 text-sm">
                  <div className="grid grid-cols-3 gap-1 py-1">
                    <div className="text-muted-foreground">Type</div>
                    <div className="col-span-2">{data?.find((item) => item.id === selectedImage)?.type}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 py-1">
                    <div className="text-muted-foreground">Size</div>
                    <div className="col-span-2">
                      {formatBytes(data?.find((item) => item.id === selectedImage)?.size || 0)}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 py-1">
                    <div className="text-muted-foreground">Uploaded</div>
                    <div className="col-span-2">{data?.find((item) => item.id === selectedImage)?.date}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 py-1">
                    <div className="text-muted-foreground">URL</div>
                    <div className="col-span-2 truncate">{data?.find((item) => item.id === selectedImage)?.url}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(data?.find((item) => item.id === selectedImage)?.url || "")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy URL
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
