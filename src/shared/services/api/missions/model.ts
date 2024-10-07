/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { createQuery, createMutation } from 'react-query-kit';

import { instance } from '@shared/services/api/axiosIntance.ts';
import { DailyReward, Mission } from '@shared/services/api/missions/types.ts';

// API functions

export const getDailyRewards = ({
  rawData,
}: {
  rawData: string
}): Promise<DailyReward[]> =>
  instance
    .get('/missions/daily_login_challenge', {
      params: { rawData },
    })
    .then((res: { data: any }) => res.data);

export const claimMissionReward = ({
  missionId,
  rawData,
}: {
  missionId: string
  rawData: string
}): Promise<any> =>
  instance
    .post(`/missions/${missionId}/claim_reward`, {}, { params: { rawData } })
    .then((res: { data: any }) => res.data);

export const getMissions = ({
  rawData,
}: {
  rawData: string
}): Promise<Mission[]> =>
  instance
    .get('/missions', {
      params: { rawData },
    })
    .then((res: { data: any }) => res.data);

export const getDailyMissions = ({
  rawData,
}: {
  rawData: string
}): Promise<Mission[]> =>
  instance
    .get('/missions/daily', {
      params: { rawData },
    })
    .then((res: { data: any }) => res.data);

export const checkMissionStatus = ({
  missionId,
  rawData,
}: {
  missionId: string
  rawData: string
}): Promise<Mission> =>
  instance
    .post(`/missions/${missionId}/check_status`, {}, { params: { rawData } })
    .then((res: { data: any }) => res.data);

// Queries and Mutations

export const useGetDailyRewards = createQuery<
  DailyReward[],
  { rawData: string }
>({
  queryKey: ['get/dailyRewards'],
  fetcher: ({ rawData }) => getDailyRewards({ rawData }),
});

export const useClaimMissionReward = createMutation<
  any,
  { missionId: string; rawData: string }
>({
  mutationFn: ({ missionId, rawData }) =>
    claimMissionReward({ missionId, rawData }),
});

export const useGetMissions = createQuery<Mission[], { rawData: string }>({
  queryKey: ['get/missions'],
  fetcher: ({ rawData }) => getMissions({ rawData }),
});

export const useGetDailyMissions = createQuery<Mission[], { rawData: string }>({
  queryKey: ['get/dailyMissions'],
  fetcher: ({ rawData }) => getDailyMissions({ rawData }),
});

export const useCheckMissionStatus = createMutation<
  Mission,
  { missionId: string; rawData: string }
>({
  mutationFn: ({ missionId, rawData }) =>
    checkMissionStatus({ missionId, rawData }),
});

export const useAllMissions = (
  rawData: string,
  options?: Omit<UseQueryOptions<Mission[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['missions', rawData],
    queryFn: async () => {
      const [missions, dailyMissions] = await Promise.all([
        useGetMissions.fetcher({ rawData }),
        useGetDailyMissions.fetcher({ rawData }),
      ]);
      const filteredDailyMissions = dailyMissions.filter(
        ({ slug }) => !slug?.includes('daily-mission-day')
      );
      return [...missions, ...filteredDailyMissions];
    },
    refetchInterval: 10000,
    ...options,
  });
};
