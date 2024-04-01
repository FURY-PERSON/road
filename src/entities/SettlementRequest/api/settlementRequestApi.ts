import { rtkApi } from '@/shared/api/rtkApi';

import { SettlementRequest } from '../models/types/settlementRequest';

const settlementRequestApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createSettlementRequest: build.mutation<void, SettlementRequest>({
      query: (args) => ({
        url: 'settlement/requests',
        method: 'POST',
        body: {
          target_dorm_id: args.targetDormId
        }
      })
    })
  })
});

export const createSettlementRequest =
  settlementRequestApi.endpoints.createSettlementRequest.initiate;
