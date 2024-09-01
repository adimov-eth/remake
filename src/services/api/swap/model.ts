import { createMutation } from 'react-query-kit';

import { CreateSwapPayload, SwapResponse } from './types';

import { instance } from '@/services/api/axiosIntance';

export const createSwap = ({
  rawData,
  body,
}: {
  rawData: string;
  body: CreateSwapPayload;
}): Promise<SwapResponse> => {
  return instance.post(`/swap_transaction/swap`, body, { params: { rawData } }).then(res => {
    return res.data;
  });
};

// Queries and Mutations

export const useCreateSwap = createMutation<
  SwapResponse,
  { rawData: string; body: CreateSwapPayload }
>({
  mutationKey: ['createSwap'],
  mutationFn: ({ rawData, body }) => {
    return createSwap({ rawData, body });
  },
});
