import { createQuery} from 'react-query-kit';
import { instance } from '@shared/services/api/axiosIntance';
import { type UserResponseData } from '@shared/services/api/user/types';
import * as Sentry from '@sentry/react';

// API function
export const getUserData = ({ rawData }: { rawData: string }): Promise<UserResponseData> =>
  instance
    .get('/users/me', {
      params: { rawData },
    })
    .then((res: { data: UserResponseData }) => {
      console.log('getUserData res', res);
      const userData = res.data.user;
      Sentry.setUser({ id: userData.tg_uid, username: userData.tg_username, email: userData.email, ip_address: '{{auto}}'});
      Sentry.setContext('api_user_data', userData);
      return res.data;
    });

// Query
export const useGetUserData = createQuery<UserResponseData, { rawData: string }>({
  queryKey: ['get/userData'],
  fetcher: ({ rawData }) => getUserData({ rawData }),
});