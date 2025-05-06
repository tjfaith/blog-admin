import { CategoriesTable } from "@/components/categories/categories-table"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { CategoryDialog } from "@/components/categories/category-dialog"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryDialog>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </CategoryDialog>
      </div>
      <CategoriesTable />
    </div>
  )
}
