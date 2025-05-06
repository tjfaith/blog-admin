"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function MediaUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleUpload = () => {
    // In a real app, this would handle file selection and upload
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Upload complete",
        description: "Your file has been uploaded successfully.",
      })
    }, 2000)
  }

  return (
    <Button onClick={handleUpload} disabled={isUploading}>
      <Upload className="h-4 w-4 mr-2" />
      {isUploading ? "Uploading..." : "Upload"}
    </Button>
  )
}
