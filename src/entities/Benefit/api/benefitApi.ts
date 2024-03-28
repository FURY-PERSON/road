import { rtkApi } from '@/shared/api/rtkApi';

import { Benefit } from '../models/types/benefit';

const benefitApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setBenefits: build.mutation<void, { studentId: string; benefits: Benefit[] }>({
      query: (args) => ({
        url: `students/${args.studentId}/benefits`,
        method: 'POST',
        body: args.benefits
      })
    })
  })
});

export const setBenefits = benefitApi.endpoints.setBenefits.initiate;
