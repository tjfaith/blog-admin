"use client"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState("visual")

  const handleCommand = (command: string) => {
    // In a real app, this would manipulate the HTML content
    // For this example, we'll just append the command to the content
    const commands: Record<string, string> = {
      bold: "<strong>Bold text</strong>",
      italic: "<em>Italic text</em>",
      bulletList: "<ul><li>List item</li></ul>",
      orderedList: "<ol><li>List item</li></ol>",
      link: '<a href="#">Link text</a>',
      image: '<img src="/placeholder.svg" alt="Image" />',
      alignLeft: '<div style="text-align: left;">Left aligned text</div>',
      alignCenter: '<div style="text-align: center;">Center aligned text</div>',
      alignRight: '<div style="text-align: right;">Right aligned text</div>',
    }

    onChange(value + commands[command])
  }

  return (
    <div className="border rounded-md">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center border-b px-3 py-2">
          <TabsList className="mr-auto">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>

          {activeTab === "visual" && (
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={() => handleCommand("bold")}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("italic")}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("bulletList")}>
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("orderedList")}>
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("link")}>
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("image")}>
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("alignLeft")}>
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("alignCenter")}>
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleCommand("alignRight")}>
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="visual" className="p-0">
          <div
            className="min-h-[200px] p-4"
            dangerouslySetInnerHTML={{ __html: value }}
            contentEditable
            onBlur={(e) => onChange(e.currentTarget.innerHTML)}
          />
        </TabsContent>

        <TabsContent value="html" className="p-0">
          <Textarea
            className="min-h-[200px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
