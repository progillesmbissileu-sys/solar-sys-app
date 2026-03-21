'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { MAX_PRODUCT_IMAGES, Product, ProductImage } from '@/entities/product';
import {
  AppImage,
  Badge,
  Button,
  Card,
  PriceDisplay,
  DateDisplay,
  Divider,
  DeleteConfirmationModal,
  UploadImageModal,
} from '@/shared/ui';
import { deleteImageMediaAction } from '@/shared/lib';
import {
  RiStockLine,
  RiPriceTag3Line,
  RiStore2Line,
  RiCalendarLine,
  RiDeleteBinLine,
  RiPencilLine,
} from '@remixicon/react';
import { DesktopPageContainer, useRightPanel } from '@/widgets/container';
import { routePaths } from '@/shared/routes';
import { PlusIcon } from 'lucide-react';
import { addProductImageAction } from '@/features/products';
import { set } from 'zod';

export function ProductDetailsView({ product }: { product: Product }) {
  const router = useRouter();
  const isLowStock = product.stockQuantity <= product.lowStockThreshold;
  const isOutOfStock = product.stockQuantity === 0;
  const { openPanel } = useRightPanel();

  const stockStatus = isOutOfStock
    ? { variant: 'error' as const, label: 'Out of Stock' }
    : isLowStock
      ? { variant: 'warning' as const, label: 'Low Stock' }
      : { variant: 'success' as const, label: 'In Stock' };

  // Gallery state
  const allImages = [product.mainImage, ...(product.images || [])];
  const [selectedImage, setSelectedImage] = useState<ProductImage>(product.mainImage);

  const [isPending, startTransition] = useTransition();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    image: ProductImage | null;
  }>({
    isOpen: false,
    image: null,
  });
  const [uploadModal, setUploadModal] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });

  const handleDeleteImage = (image: ProductImage) => {
    setDeleteModal({ isOpen: true, image });
  };

  const confirmDeleteImage = () => {
    if (!deleteModal.image?.id) return;

    startTransition(async () => {
      await deleteImageMediaAction(deleteModal.image!.id!);
      setDeleteModal({ isOpen: false, image: null });
      router.refresh();
    });
  };

  const confirmUploadImage = async (data: {
    file: File;
    alt?: string;
    title?: string;
    isMainImage?: boolean;
  }) =>
    await addProductImageAction(
      {
        file: data.file,
        alt: data.alt,
        title: data.title,
      },
      product.id,
      data.isMainImage
    );

  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: 'Acceuil', href: '/' },
        { label: 'Produits', href: routePaths.PRODUCTS },
        {
          label: product.designation,
          href: routePaths.PRODUCTS_OVERVIEW.replace('{id}', product.id),
        },
      ]}
      pageHeader={{
        title: product.designation,
        actions: (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                openPanel('PRODUCT_FORM', {
                  title: 'Modifier produit',
                  width: '35vw',
                  initialValues: product,
                });
              }}
              className="gap-x-2"
            >
              <RiPencilLine className="size-4" />
              Modifier
            </Button>
          </div>
        ),
      }}
    >
      <main className="w-full p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Image Gallery */}
          <div className="space-y-4 lg:col-span-1">
            {/* Main Selected Image */}
            <Card className="overflow-hidden p-0">
              <figure className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
                <AppImage
                  fill
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  unoptimized
                  className="object-cover"
                />
              </figure>
            </Card>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2">
              {allImages.length > 1 &&
                allImages.map((image, index) => {
                  const isSelected = selectedImage.url === image.url;
                  const isMainImage = image.url === product.mainImage.url;

                  return (
                    <div key={image.id || index} className="group relative">
                      <Card
                        className={`cursor-pointer overflow-hidden p-0 transition-all ${
                          isSelected
                            ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                            : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <figure className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
                          <AppImage
                            fill
                            src={image.url}
                            alt={image.alt}
                            unoptimized
                            className="object-cover"
                          />
                        </figure>
                      </Card>

                      {/* Delete button - only on hover for non-selected items */}
                      {!isSelected && !isMainImage && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image);
                          }}
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition-opacity hover:bg-red-600 group-hover:opacity-100"
                          title="Delete image"
                          disabled={isPending}
                        >
                          <RiDeleteBinLine className="size-3.5" />
                        </button>
                      )}

                      {/* Main image badge */}
                      {isMainImage && (
                        <span className="absolute bottom-1 left-1 rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          Main
                        </span>
                      )}
                    </div>
                  );
                })}
              {allImages.length < MAX_PRODUCT_IMAGES && (
                <Card
                  className={`aspect-square cursor-pointer overflow-hidden bg-gray-50 p-0 transition-all dark:bg-gray-900`}
                  onClick={() => setUploadModal({ isOpen: true })}
                >
                  <div className="h-full w-full content-center">
                    <PlusIcon className="mx-auto h-6 w-6 text-gray-500" />
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {product.designation}
                    </h1>
                    {product.brand && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        by{' '}
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {product.brand}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                  </div>
                </div>

                <Divider />

                {/* Price */}
                <div className="flex items-center gap-3">
                  <RiPriceTag3Line className="size-5 text-gray-400" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Price
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      <PriceDisplay amount={product.price} />
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
                {product.description}
              </p>
            </Card>

            {/* Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Category */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <RiStore2Line className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {product.category.designation || 'Uncategorized'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Stock */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <RiStockLine className="size-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Stock Quantity</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {product.stockQuantity} units
                      {isLowStock && !isOutOfStock && (
                        <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">
                          (Low threshold: {product.lowStockThreshold})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Created Date */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                    <RiCalendarLine className="size-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {product.createdAt ? <DateDisplay date={product.createdAt} /> : 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Updated Date */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                    <RiCalendarLine className="size-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {product.updatedAt ? <DateDisplay date={product.updatedAt} /> : 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Product ID */}
            <div className="text-xs text-gray-400 dark:text-gray-500">
              ID: <span className="font-mono">{product.id}</span>
            </div>
          </div>
        </div>

        <DeleteConfirmationModal
          open={deleteModal.isOpen}
          loading={isPending}
          content={<p className="text-center">Êtes-vous sûr de vouloir supprimer cette image ?</p>}
          onConfirm={confirmDeleteImage}
          onOpenChange={(open) => setDeleteModal((prev) => ({ ...prev, isOpen: open }))}
        />
        <UploadImageModal
          open={uploadModal.isOpen}
          onOpenChange={(open) => setUploadModal((prev) => ({ ...prev, isOpen: open }))}
          onConfirm={confirmUploadImage}
        />
      </main>
    </DesktopPageContainer>
  );
}
