"use client"

import { ProductCategoryPreview } from "@/entities/product"
import DateDisplay from "@/shared/ui/molecules/DateDisplay"
import { CollectionManager } from "@/widgets/collection"
import { CollectionResponseType } from "@/shared/api"
import { DesktopPageContainer } from "@/widgets/container"
import { Button } from "@/shared/ui/atoms/Button"
import { Label } from "@/shared/ui/atoms/Label"
import { RiBox1Line } from "@remixicon/react"

export default function ProductCategoriesView({
  collection,
}: {
  collection: CollectionResponseType<ProductCategoryPreview>
}) {
  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Categories", href: "/products/categories" },
      ]}
      pageHeader={{
        title: "product.pageTitle.category",
        actions: (
          <div>
            <Button className="cursor-pointer gap-x-2">
              <RiBox1Line className="size-5 text-white/90" />
              <Label className="cursor-pointer text-white/90">action.new</Label>
            </Button>
          </div>
        ),
      }}
    >
      <CollectionManager<ProductCategoryPreview>
        columns={[
          {
            key: "name",
            title: "common.designation",
            dataIndex: "designation",
          },
          {
            key: "date",
            title: "common.addedAt",
            align: "end",
            render: (product) => (
              <DateDisplay date={product.createdAt} variant="short" />
            ),
          },
        ]}
        collection={collection}
      />
    </DesktopPageContainer>
  )
}
