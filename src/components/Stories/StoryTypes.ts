import { UserResponse } from '@/services/api/user/types';

export interface StoryContentProps {
  action: (type: string) => void;
  isPaused: boolean;
  story: {
    header: {
      heading: string;
      subheading: string;
    };
  };
  languageCode: string;
  user: UserResponse | undefined;
}