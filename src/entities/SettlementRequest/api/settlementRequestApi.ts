import decamelizeKeys from 'decamelize-keys';

import { settlementRtkApi } from '@/shared/api/rtkApi';

import { SettlementRequest } from '../models/types/settlementRequest';

const settlementRequestApi = settlementRtkApi.injectEndpoints({
  endpoints: (build) => ({
    createSettlementRequest: build.mutation<void, SettlementRequest>({
      invalidatesTags: ['studentSettlement'],
      query: (args) => ({
        url: 'settlement/requests',
        method: 'POST',
        body: decamelizeKeys(args)
      })
    })
  })
});

export const createSettlementRequest =
  settlementRequestApi.endpoints.createSettlementRequest.initiate;
