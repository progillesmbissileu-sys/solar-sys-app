'use client';

import { MarketService } from '@/entities/market-service';
import {
  AppImage,
  Badge,
  Button,
  Card,
  DateDisplay,
  DeleteConfirmationModal,
  Divider,
} from '@/shared/ui';
import { DesktopPageContainer } from '@/widgets/container';
import { RiDeleteBinLine, RiPencilLine, RiImageLine } from '@remixicon/react';
import { routePaths } from '@/shared/routes';
import { useMarketServiceDetailsController } from '../lib/useMarketServiceDetailsController';

export function MarketServiceDetailsView({ service }: { service: MarketService }) {
  const controller = useMarketServiceDetailsController(service);

  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: 'Acceuil', href: '/' },
        { label: 'Services', href: routePaths.MARKET_SERVICES },
        {
          label: service.designation,
          href: routePaths.MARKET_SERVICES_DETAILS.replace('{id}', service.id),
        },
      ]}
      pageHeader={{
        title: service.designation,
        actions: (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={controller.actions.handleEdit} className="gap-x-2">
              <RiPencilLine className="size-4" />
              Modifier
            </Button>
            <Button
              variant="destructive"
              className="gap-x-2"
              onClick={controller.actions.requestDelete}
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
              <figure className="group relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
                {service.thumbnailId ? (
                  <AppImage
                    fill
                    src={service.thumbnailUrl}
                    alt={service.designation}
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <RiImageLine className="size-16 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
                {/* Hover overlay with modify button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <input
                    ref={controller.refs.fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={controller.actions.handleThumbnailReplace}
                    className="hidden"
                  />
                  <Button
                    variant="secondary"
                    onClick={controller.actions.openFilePicker}
                    disabled={controller.state.isUploading}
                    className="gap-x-2"
                  >
                    <RiImageLine className="size-4" />
                    {controller.state.isUploading ? 'Chargement...' : "Modifier l'image"}
                  </Button>
                </div>
              </figure>
            </Card>
          </div>

          {/* Service Info Section */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header Card */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {service.designation}
                    </h1>
                  </div>
                </div>

                <Divider />

                {/* Short Description */}
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Description courte
                  </p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">
                    {service.shortDescription || 'Aucune description courte'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Content Description */}
            <Card>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Description détaillée
              </h2>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: service.contentDescription || '<p>Aucune description</p>',
                }}
              />
            </Card>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <Card>
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Caractéristiques ({service.features.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="neutral">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Created Date */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                    <RiImageLine className="size-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Créé le</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {service.createdAt ? <DateDisplay date={service.createdAt} /> : 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Updated Date */}
              <Card>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                    <RiImageLine className="size-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mis à jour</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {service.updatedAt ? <DateDisplay date={service.updatedAt} /> : 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Service ID */}
            <div className="text-xs text-gray-400 dark:text-gray-500">
              ID: <span className="font-mono">{service.id}</span>
            </div>
          </div>
        </div>
      </main>
      <DeleteConfirmationModal
        open={controller.state.isModalOpen}
        content={
          <p className="text-center">
            Êtes-vous sûr de vouloir supprimer le service: <strong>{service.designation}</strong> ?
          </p>
        }
        onConfirm={controller.actions.handleDelete}
        onOpenChange={controller.actions.setIsModalOpen}
      />
    </DesktopPageContainer>
  );
}
