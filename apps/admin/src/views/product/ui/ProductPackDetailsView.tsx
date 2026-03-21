'use client';

import { ProductPackage } from '@/entities/product';
import {
  AppImage,
  Badge,
  Button,
  Card,
  PriceDisplay,
  DateDisplay,
  Divider,
  DeleteConfirmationModal,
} from '@/shared/ui';
import { DesktopPageContainer } from '@/widgets/container';
import { RiDeleteBinLine, RiPencilLine, RiBox1Line } from '@remixicon/react';
import { routePaths } from '@/shared/routes';
import { useProductPackDetailsController } from '../lib/useProductPackDetailsController';

export function ProductPackDetailsView({ productPackage }: { productPackage: ProductPackage }) {
  const {
    isPending,
    handleEdit,
    requestDeleteItem,
    requestDeletePackage,
    deleteModal,
    toggleDeleteModal,
    confirmDelete,
  } = useProductPackDetailsController(productPackage);

  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: 'Acceuil', href: '/' },
        { label: 'Packages', href: routePaths.PRODUCTS_PACKAGES },
        {
          label: productPackage.designation,
          href: routePaths.PRODUCTS_PACKAGES_DETAILS.replace('[id]', productPackage.id),
        },
      ]}
      pageHeader={{
        title: productPackage.designation,
        actions: (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleEdit} className="gap-x-2">
              <RiPencilLine className="size-4" />
              Modifier
            </Button>
            <Button
              variant="destructive"
              onClick={requestDeletePackage}
              className="gap-x-2"
              disabled={isPending}
            >
              <RiDeleteBinLine className="size-4" />
              Supprimer
            </Button>
          </div>
        ),
      }}
    >
      <main className="w-full p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Image Section */}
          <div className="space-y-4 lg:col-span-1">
            <Card className="overflow-hidden p-0">
              <figure className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
                {productPackage.mainImage ? (
                  <AppImage
                    fill
                    src={productPackage.mainImage.url}
                    alt={productPackage.designation}
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <RiBox1Line className="size-16 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
              </figure>
            </Card>
          </div>

          {/* Package Info Section */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header Card */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {productPackage.designation}
                    </h1>
                    <Badge
                      variant={productPackage.isAvailable ? 'success' : 'neutral'}
                      className="mt-2"
                    >
                      {productPackage.isAvailable ? 'Disponible' : 'Indisponible'}
                    </Badge>
                  </div>
                </div>

                <Divider />

                {/* Price */}
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Prix
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      <PriceDisplay amount={productPackage.price} />
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Description
              </h2>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">
                {productPackage.description || 'Aucune description'}
              </p>
            </Card>

            {/* Items List */}
            <Card>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Produits du package ({productPackage.items.length})
              </h2>
              <div className="space-y-3">
                {productPackage.items.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">Aucun produit dans ce package</p>
                ) : (
                  productPackage.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <AppImage
                          src={item.productMainImageUrl}
                          alt={item.productName}
                          width={48}
                          height={48}
                          unoptimized
                          className="rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => requestDeleteItem(item)}
                        className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        disabled={isPending}
                      >
                        <RiDeleteBinLine className="size-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Created Date */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                    <RiBox1Line className="size-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Créé le</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {productPackage.createdAt ? (
                        <DateDisplay date={productPackage.createdAt} />
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Updated Date */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                    <RiBox1Line className="size-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mis à jour</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {productPackage.updatedAt ? (
                        <DateDisplay date={productPackage.updatedAt} />
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Package ID */}
            <div className="text-xs text-gray-400 dark:text-gray-500">
              ID: <span className="font-mono">{productPackage.id}</span>
            </div>
          </div>
        </div>
      </main>
      <DeleteConfirmationModal
        loading={isPending}
        open={deleteModal.isOpen}
        content={<p className="text-center">{deleteModal.message}</p>}
        onConfirm={confirmDelete}
        onOpenChange={toggleDeleteModal}
      />
    </DesktopPageContainer>
  );
}
