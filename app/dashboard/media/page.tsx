import { MediaGallery } from "@/components/media/media-gallery"
import { MediaUpload } from "@/components/media/media-upload"

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <MediaUpload />
      </div>
      <MediaGallery />
    </div>
  )
}
