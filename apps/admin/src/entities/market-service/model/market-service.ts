export interface MarketService {
  id: string;
  slug: string;
  thumbnail: { id: string; url: string };
  designation: string;
  shortDescription: string;
  contentDescription: string;
  features: Array<MarketServiceFeature>;
  images: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export type MarketServiceFeature = string;

export type CreateMarketServicePayload = {
  designation: string;
  thumbnailId: string;
  contentDescription: string;
  shortDescription: string;
  features: Array<MarketServiceFeature>;
};

export type UpdateMarketServicePayload = CreateMarketServicePayload;

export type MarketServiceCollectionItem = {
  id: string;
  thumbnailUrl: string;
  designation: string;
  shortDescription: string;
  createdAt: string;
  updatedAt: string;
};
