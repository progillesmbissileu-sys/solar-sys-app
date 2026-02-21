"use client"

import { Fragment } from "react"
import { AppTable } from "@/shared/ui/organisms/AppTable"
import { ProductPreview } from "@/entities/product"
import { PriceDisplay } from "@/shared/ui/molecules"
import DateDisplay from "@/shared/ui/molecules/DateDisplay"

export default function ProductManagementView({
  productItems,
}: {
  productItems: ProductPreview[]
}) {
  return (
    <Fragment>
      <AppTable<ProductPreview>
        columns={[
          {
            key: "name",
            title: "common.designation",
            dataIndex: "designation",
          },
          {
            key: "price",
            title: "common.price",
            align: "end",
            render: (product) => <PriceDisplay amount={product.price} />,
          },
          {
            key: "category",
            title: "common.category",
            dataIndex: "categoryName",
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
        dataSource={productItems}
      />
    </Fragment>
  )
}
