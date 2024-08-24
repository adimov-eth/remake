export type Referrer = {
  id: string;
  joined_at: string;
  level: number;
  quarks: number;
  stars: string;
  tg_fullname: string;
  tg_profile_image: string;
  tg_uid: string;
  tg_username: string;
  reward_quarks: number;
  reward_stars: number;
};
export interface UserResponse {
  id: string;
  clicker_state: {
    id: string;
    clicks: number;
    energy_reset: number;
    energy_reset_at: string;
    level: number;
    quarks: number;
    stars: number;
  };
  email: string;
  joined_at: string;
  onboarding_complete: boolean;
  profile_options: {
    onboarding_complete: boolean;
    notifications_enabled: boolean;
  };
  referrals: Array<Referrer> | null;
  referrer: Referrer | null;
  referrer_tg_uid: null | string;
  tg_fullname: string;
  tg_profile_image: null | string;
  tg_uid: string;
  tg_username: string;
  user_upgrades: any[];
  can_play: boolean;
  total_reward_quarks: number;
  total_reward_stars: number;
}

export interface UserMeta {
  referrals_pagination: {
    page: number;
    items: number;
    pages: number;
    count: number;
  };
}

export interface UserResponseData {
  user: UserResponse;
  meta: UserMeta;
}

