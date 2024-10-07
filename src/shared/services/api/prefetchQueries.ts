import {
  useGetDailyMissions,
  useGetDailyRewards,
  useGetMissions,
} from '@shared/services/api/missions/model';
import { useGetUserData } from '@shared/services/api/user/model';
import { queryClient } from '@shared/services/api/queryClient';


export const prefetchMissionsAndRewards = async (rawData: string) => {
  // Prefetch daily rewards
  await queryClient.prefetchQuery({
    queryKey: useGetDailyRewards.getKey({ rawData }),
    queryFn: () => useGetDailyRewards.fetcher({ rawData }),
  });

  // Prefetch all missions
  await queryClient.prefetchQuery({
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
  });
};

export const prefetchUserData = async (rawData: string) => {
  // Prefetch user data
  await queryClient.prefetchQuery({
    queryKey: useGetUserData.getKey({ rawData }),
    queryFn: () => useGetUserData.fetcher({ rawData }),
  });
};
