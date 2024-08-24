import { createQuery} from 'react-query-kit'
import { instance } from '@/services/api/axiosIntance'
import { type UserResponseData } from '@/services/api/user/types'

// API function
export const getUserData = ({ rawData }: { rawData: string }): Promise<UserResponseData> =>
  instance
    .get(`/users/me`, {
      params: { rawData },
    })
    .then((res: { data: UserResponseData }) => {
      console.log('getUserData res', res)
      return res.data
    })

// Query
export const useGetUserData = createQuery<UserResponseData, { rawData: string }>({
  queryKey: ['get/userData'],
  fetcher: ({ rawData }) => getUserData({ rawData }),
})