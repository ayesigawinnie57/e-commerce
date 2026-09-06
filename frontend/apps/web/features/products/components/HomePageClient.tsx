'use client';

import { useHomepage, usePopularProducts, useTrendingProducts } from '@/hooks/useQueries';
import { HeroSection } from './HeroSection';
import { CategorySection } from './CategorySection';
import { FlashDeals } from './FlashDeals';
import { ProductSection } from './ProductSection';
import { PromoBanner } from './PromoBanner';
import { BrandsSection } from './BrandsSection';
import { TrustSection } from './TrustSection';
import { SellerCTA } from './SellerCTA';
import { AppPromo } from './AppPromo';
import { Newsletter } from './Newsletter';
import { ROUTES } from '@zavora/config';

export function HomePageClient() {
  const { data: homepage } = useHomepage();
  const { data: popularData, isLoading: popularLoading, isError: popularError, refetch: refetchPopular } = usePopularProducts();
  const { data: trendingData, isLoading: trendingLoading, isError: trendingError, refetch: refetchTrending } = useTrendingProducts();

  const popularProducts = homepage?.popularProducts ?? popularData?.results;
  const trendingProducts = homepage?.trendingProducts ?? trendingData?.results;
  const flashDealsEndsAt = homepage?.flashDeals?.endsAt;
  const promoBanner = homepage?.promotionalBanner;
  const categorySections = homepage?.categorySections ?? [];

  return (
    <div className="flex flex-col">
      <HeroSection />

      <div className="container-page flex flex-col gap-10 py-10">
        <CategorySection />

        <FlashDeals endsAt={flashDealsEndsAt} />

        <ProductSection
          title="Popular Products"
          products={popularProducts}
          isLoading={!homepage && popularLoading}
          isError={!homepage && popularError}
          onRetry={refetchPopular}
          viewAllHref={ROUTES.products}
        />

        <PromoBanner banner={promoBanner} />

        <ProductSection
          title="Trending Now"
          products={trendingProducts}
          isLoading={!homepage && trendingLoading}
          isError={!homepage && trendingError}
          onRetry={refetchTrending}
          viewAllHref={`${ROUTES.products}?ordering=-view_count`}
          viewAllLabel="View All →"
        />

        {categorySections.map(({ category, products }) => (
          <ProductSection
            key={category.id}
            title={category.name}
            products={products}
            viewAllHref={ROUTES.category(category.slug)}
            shopButtonLabel={`Shop ${category.name} →`}
            shopButtonHref={ROUTES.category(category.slug)}
          />
        ))}

        <BrandsSection />
        <TrustSection />
        <SellerCTA />
        <AppPromo />
        <Newsletter />
      </div>
    </div>
  );
}
