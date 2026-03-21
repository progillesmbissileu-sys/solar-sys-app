'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { Product, ProductImage } from '@/entities/product';
import { MAX_PRODUCT_IMAGES } from '@/entities/product';
import { deleteImageMediaAction } from '@/shared/lib';
import { addProductImageAction } from '@/features/products';
import { useEvents } from '@repo/core';

type DeleteModalState = {
  isOpen: boolean;
  image: ProductImage | null;
};

type UploadModalState = {
  isOpen: boolean;
};

export type UploadImagePayload = {
  file: File[];
  alt?: string;
  title?: string;
  isMainImage?: 'true' | 'false';
};

export function useProductDetailsController(product: Product) {
  const router = useRouter();
  const events = useEvents();

  const actions = React.useMemo(() => {
    return {
      router,
      events,
    };
  }, [events, router]);

  // Derived stock status
  const isLowStock = product.stockQuantity <= product.lowStockThreshold;
  const isOutOfStock = product.stockQuantity === 0;

  const stockStatus = React.useMemo(() => {
    return isOutOfStock
      ? { variant: 'error' as const, label: 'Out of Stock' }
      : isLowStock
        ? { variant: 'warning' as const, label: 'Low Stock' }
        : { variant: 'success' as const, label: 'In Stock' };
  }, [isLowStock, isOutOfStock]);

  // Gallery
  const allImages = React.useMemo(() => {
    return [product.mainImage, ...(product.images || [])];
  }, [product.mainImage, product.images]);

  const [selectedImage, setSelectedImage] = React.useState<ProductImage>(product.mainImage);

  // If the product changes (navigation / refresh), keep selection in sync
  React.useEffect(() => {
    setSelectedImage(product.mainImage);
  }, [product.mainImage?.url]);

  // UI state
  const [isPending, startTransition] = React.useTransition();

  const [deleteModal, setDeleteModal] = React.useState<DeleteModalState>({
    isOpen: false,
    image: null,
  });

  const [uploadModal, setUploadModal] = React.useState<UploadModalState>({
    isOpen: false,
  });

  const openDeleteModal = React.useCallback((image: ProductImage) => {
    setDeleteModal({ isOpen: true, image });
  }, []);

  const setDeleteModalOpen = React.useCallback((open: boolean) => {
    setDeleteModal((prev) => ({ ...prev, isOpen: open }));
  }, []);

  const openUploadModal = React.useCallback(() => {
    setUploadModal({ isOpen: true });
  }, []);

  const setUploadModalOpen = React.useCallback((open: boolean) => {
    setUploadModal((prev) => ({ ...prev, isOpen: open }));
  }, []);

  const confirmDeleteImage = React.useCallback(() => {
    const imageId = deleteModal.image?.id;
    if (!imageId) return;

    startTransition(async () => {
      const response = await deleteImageMediaAction(imageId);

      if (response.success) {
        actions.events.success('Image supprimée avec success');
        setDeleteModal({ isOpen: false, image: null });
        actions.router.refresh();
      } else {
        actions.events.error("Echec de la suppression d'une image");
      }
    });
  }, [actions, deleteModal.image?.id]);

  const confirmUploadImage = React.useCallback(
    async (data: UploadImagePayload) => {
      const response = await addProductImageAction(
        {
          file: data.file,
          alt: data.alt,
          title: data.title,
        },
        product.id,
        data.isMainImage === 'true'
      );

      if (response.success) {
        actions.events.success('Image ajoutée avec success');
        setUploadModal({ isOpen: false });
        actions.router.refresh();
      } else {
        actions.events.error("Echec de l'ajout d'une image");
      }
    },
    [actions, product.id]
  );

  const canAddMoreImages = allImages.length < MAX_PRODUCT_IMAGES;

  const state = React.useMemo(() => {
    return {
      // derived
      isLowStock,
      isOutOfStock,
      stockStatus,

      // gallery
      allImages,
      selectedImage,
      canAddMoreImages,

      // pending
      isPending,

      // delete modal
      deleteModal,

      // upload modal
      uploadModal,
    };
  }, [
    allImages,
    canAddMoreImages,
    deleteModal,
    isLowStock,
    isOutOfStock,
    isPending,
    selectedImage,
    stockStatus,
    uploadModal,
  ]);

  return {
    state,
    actions: {
      // gallery
      setSelectedImage,

      // delete modal
      openDeleteModal,
      setDeleteModalOpen,
      confirmDeleteImage,

      // upload modal
      openUploadModal,
      setUploadModalOpen,
      confirmUploadImage,
    },
  };
}
