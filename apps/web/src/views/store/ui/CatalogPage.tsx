import { PageContainer } from '@/widgets/layout/ui/PageContainer';
import { ProductBrowserComponent } from '@/features/products';
import { APP_ROUTES } from '@/shared/config/app-routes';

export default function CatalogPage() {
  return (
    <PageContainer>
      <section className="relative content-center xl:h-48">
        <h3 className="mx-auto w-fit text-center text-5xl font-bold">TITLE</h3>
        <div className="absolute bottom-12 left-[calc(50%-48px)] h-1.5 w-24 bg-yellow-500"></div>
      </section>
      <section>
        <div className="container xl:pt-0 xl:pb-24">
          <ProductBrowserComponent path={APP_ROUTES.IN_STORE} />
        </div>
      </section>
    </PageContainer>
  );
}
