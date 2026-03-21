'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { ProductPackage, ProductPackageItem } from '@/entities/product';
import { routePaths } from '@/shared/routes';
import { removeProductPackItemAction, deleteProductPackAction } from '@/features/products';
import { useRightPanel } from '@/widgets/container';

type DeleteModalState = {
  isOpen: boolean;
  handle: (() => void) | null;
  message: React.ReactNode;
};

export function useProductPackDetailsController(productPackage: ProductPackage) {
  const { openPanel } = useRightPanel();
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const [deleteModal, setDeleteModal] = React.useState<DeleteModalState>({
    isOpen: false,
    handle: null,
    message: null,
  });

  const openDeleteModal = React.useCallback((params: { message: React.ReactNode; handle: () => void }) => {
    setDeleteModal({ isOpen: true, message: params.message, handle: params.handle });
  }, []);

  const closeDeleteModal = React.useCallback(() => {
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const toggleDeleteModal = React.useCallback(() => {
    setDeleteModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const handleEdit = React.useCallback(() => {
    openPanel('PRODUCT_PACKAGE_FORM', {
      title: 'Modifier le package',
      width: '50vw',
      initialValues: {
        id: productPackage.id,
        designation: productPackage.designation,
        description: productPackage.description,
        price: productPackage.price,
        items: productPackage.items.map((item) => ({
          value: item.productId,
          label: item.productName,
        })),
      },
    });
  }, [
    openPanel,
    productPackage.id,
    productPackage.designation,
    productPackage.description,
    productPackage.price,
    productPackage.items,
  ]);

  const requestDeleteItem = React.useCallback(
    (item: ProductPackageItem) => {
      openDeleteModal({
        message: `Supprimer "${item.productName}" du package ?`,
        handle: () => {
          startTransition(async () => {
            await removeProductPackItemAction(item.id);
            closeDeleteModal();
            router.refresh();
          });
        },
      });
    },
    [closeDeleteModal, openDeleteModal, router]
  );

  const requestDeletePackage = React.useCallback(() => {
    openDeleteModal({
      message: 'Supprimer ce package ? Cette action est irréversible.',
      handle: () => {
        startTransition(async () => {
          const result = await deleteProductPackAction(productPackage.id);
          if (result.success) {
            router.push(routePaths.PRODUCTS_PACKAGES);
          }
        });
      },
    });
  }, [openDeleteModal, productPackage.id, router]);

  const confirmDelete = React.useCallback(() => {
    deleteModal.handle?.();
  }, [deleteModal.handle]);

  return {
    isPending,

    // edit
    handleEdit,

    // delete actions
    requestDeleteItem,
    requestDeletePackage,

    // modal state / controls
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    toggleDeleteModal,
    confirmDelete,
    setDeleteModal,
  };
}
