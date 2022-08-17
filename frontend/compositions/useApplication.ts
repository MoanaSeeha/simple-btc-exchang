import { reactive, useContext } from '@nuxtjs/composition-api'
import { BuildDealRequest } from '~/api'

type NewDealState = {
  sendAmount: number
  sendFund: string
  sendFundLabel: string
  currentNetworkFee: number
  receiveAmount: number
  receiveFund: string
  receiveFundLabel: string
  walletAddress: string
  acceptRulesCheckbox: boolean
  email: string
  course: number
  exchangeFee: number
}
const newDealState = reactive<NewDealState>({
  sendAmount: 0,
  sendFund: 'USD',
  sendFundLabel: '',
  currentNetworkFee: 0,
  receiveAmount: 0,
  receiveFund: 'BTC',
  receiveFundLabel: '',
  walletAddress: '',
  acceptRulesCheckbox: false,
  email: '',
  course: 0,
  exchangeFee: 0
})

export default function useApplication() {
  const { $repository }: any = useContext()

  async function buildDeal() {
    const payload: BuildDealRequest = {
      course: Number(newDealState.course),
      currentNetworkFee: newDealState.currentNetworkFee,
      email: newDealState.email,
      receiveFund: newDealState.receiveFund,
      sendFund: newDealState.sendFund,
      walletAddress: newDealState.walletAddress,
      sendAmount: Number(newDealState.sendAmount)
    }
    return await $repository.application.buildDeal(payload)
  }

  return {
    buildDeal,
    newDealState
  }
}
