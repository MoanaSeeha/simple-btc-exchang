import { NuxtAxiosInstance } from '@nuxtjs/axios'
import snakecaseKeys from 'snakecase-keys'
import camelcaseKeys from 'camelcase-keys'

export type BuildDealRequest = {
  sendAmount: number
  sendFund: string
  currentNetworkFee: number
  receiveFund: string
  walletAddress: string
  email: string
  course: number
}

export type BuildDealResponse = {
  sendAmount: number
  receiveAmount: number
  exchangeFee: number
  networkFee: number
  recipientAddress: number
  exchangeRate: number
  sendFund: string
  receiveFund: string
}

export const applicationRepository = (axios: NuxtAxiosInstance) => ({
  async buildDeal(payload: BuildDealRequest): Promise<BuildDealResponse> {
    return await axios
      .$post('http://localhost:45000/api/v1/deal', snakecaseKeys(payload))
      .then(response => camelcaseKeys(response))
  }
})

export type ApplicationRepository = ReturnType<typeof applicationRepository>
