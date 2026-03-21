'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import type { MarketService } from '@/entities/market-service';
import { replaceServiceThumbnailAction } from '@/features/market-services';
import { deleteServiceAction } from '@/features/market-services/lib/delete-service-action';
import { useRightPanel } from '@/widgets/container';

type MarketServiceDetailsControllerState = {
  isUploading: boolean;
  isModalOpen: boolean;
};

type MarketServiceDetailsControllerActions = {
  handleEdit: () => void;

  openFilePicker: () => void;
  handleThumbnailReplace: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;

  requestDelete: () => void;
  handleDelete: () => Promise<void>;

  // passthrough for DeleteConfirmationModal `onOpenChange`
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type MarketServiceDetailsControllerRefs = {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};

export function useMarketServiceDetailsController(service: MarketService): {
  state: MarketServiceDetailsControllerState;
  actions: MarketServiceDetailsControllerActions;
  refs: MarketServiceDetailsControllerRefs;
} {
  const { openPanel } = useRightPanel();
  const router = useRouter();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEdit = React.useCallback(() => {
    openPanel('MARKET_SERVICE_FORM', {
      title: 'Modifier le service',
      width: '40vw',
      initialValues: {
        id: service.id,
        designation: service.designation,
        shortDescription: service.shortDescription,
        contentDescription: service.contentDescription,
        features: service.features,
      },
    });
  }, [
    openPanel,
    service.id,
    service.designation,
    service.shortDescription,
    service.contentDescription,
    service.features,
  ]);

  const openFilePicker = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleThumbnailReplace = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const result = await replaceServiceThumbnailAction(service.id, file);
        if (result.success) {
          router.refresh();
        }
      } finally {
        setIsUploading(false);
        // allow selecting the same file again
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    },
    [router, service.id]
  );

  const requestDelete = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleDelete = React.useCallback(async () => {
    const result = await deleteServiceAction(service.id);

    // Preserve original behavior from the view:
    // close modal only if deletion succeeded
    setIsModalOpen(!result.success);

    if (result.success) {
      router.refresh();
    }
  }, [router, service.id]);

  return {
    state: {
      isUploading,
      isModalOpen,
    },
    refs: {
      fileInputRef,
    },
    actions: {
      handleEdit,
      openFilePicker,
      handleThumbnailReplace,
      requestDelete,
      handleDelete,
      setIsModalOpen,
    },
  };
}
