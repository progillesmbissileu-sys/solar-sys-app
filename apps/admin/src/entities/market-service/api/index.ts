import {
  callActionSafe,
  callActionWithIdSafe,
  CollectionResponseType,
  mutation,
  mutationWithId,
  Result,
} from '@/shared/api';

import {
  CreateMarketServicePayload,
  MarketService,
  MarketServiceCollectionItem,
  UpdateMarketServicePayload,
} from '../model/market-service';

export const marketServiceCollection = callActionSafe<
  CollectionResponseType<MarketServiceCollectionItem>
>('/api/market-services', 'GET');

export const marketServiceDetail = callActionWithIdSafe<{ data: MarketService }>(
  '/api/market-services/{id}',
  'GET'
);

export const marketServiceCreate = mutation<CreateMarketServicePayload>(
  '/api/market-services',
  'POST'
);

export const marketServiceUpdate = mutationWithId<UpdateMarketServicePayload>(
  '/api/market-services/{id}',
  'PUT'
);

export const marketServiceDelete = callActionWithIdSafe('/api/market-services/{id}', 'DELETE');

export const replaceServiceThumbnail = mutationWithId<{ thumbnailId: string }>(
  '/api/market-services/{serviceId}/thumbnail',
  'PUT'
);
