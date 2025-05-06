"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { MediaUpload } from "./media-upload"

// Mock API call
const fetchMedia = async () => {
  // In a real app, this would be an API call
  return [
    { id: "1", url: "/placeholder.svg", name: "Image 1", type: "image/jpeg", size: 1024 * 1024 },
    { id: "2", url: "/placeholder.svg", name: "Image 2", type: "image/png", size: 512 * 1024 },
    { id: "3", url: "/placeholder.svg", name: "Image 3", type: "image/jpeg", size: 2048 * 1024 },
    { id: "4", url: "/placeholder.svg", name: "Image 4", type: "image/png", size: 768 * 1024 },
  ]
}

interface MediaSelectorProps {
  selectedImage: string
  onSelect: (url: string) => void
}

export function MediaSelector({ selectedImage, onSelect }: MediaSelectorProps) {
  const [open, setOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: fetchMedia,
  })

  return (
    <div className="space-y-4">
      {selectedImage ? (
        <div className="relative aspect-video rounded-md overflow-hidden border">
          <Image src={selectedImage || "/placeholder.svg"} alt="Featured image" fill className="object-cover" />
          <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => onSelect("")}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="aspect-video rounded-md border border-dashed flex items-center justify-center bg-muted">
          <p className="text-sm text-muted-foreground">No image selected</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            {selectedImage ? "Change Image" : "Select Image"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
          </DialogHeader>

          <div className="flex justify-end mb-4">
            <MediaUpload />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.map((item) => (
                <div
                  key={item.id}
                  className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer transition-all ${
                    selectedImage === item.url ? "ring-2 ring-primary" : "hover:opacity-80"
                  }`}
                  onClick={() => {
                    onSelect(item.url)
                    setOpen(false)
                  }}
                >
                  <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
