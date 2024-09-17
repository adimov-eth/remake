export enum CurrencyEnum {
  QUARK = 'quarks',
  STAR = 'stars',
}

export interface CreateSwapPayload {
  amount: string
  currency: CurrencyEnum
}

export interface SwapResponse {
  id: number
  amount: string
  created_at: string
  currency: CurrencyEnum
  status: 'pending' | 'error'
  updated_at: string
  user_id: string
}
