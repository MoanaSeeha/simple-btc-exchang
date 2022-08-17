import { reactive, useContext } from '@nuxtjs/composition-api'
import { CourseResponse } from 'api/externalApiRepository'

const initState = {
  // all exchange rates are based on dollars
  courses: {
    USD: {
      value: 1,
      roundSize: 2
    },
    BTC: {
      value: 0,
      roundSize: 8
    }
  },
  exchangeFee: 0.03,
  networkFee: {
    BTC: 0.000006
  },
  availableSendFunds: ['USD'],
  availableReceiveFunds: ['BTC'],
  fundsLabels: { USD: 'Test USD', BTC: 'Test BTC' }
}

const state = reactive(initState)

export default function useDictionary() {
  const { $repository }: any = useContext()

  async function loadCourses() {
    return await $repository.externalApi
      .loadCourses()
      .then(
        (response: CourseResponse) =>
          (state.courses.BTC.value = response.coin.price)
      )
  }

  function getCurrentCourseInUsdByFund(fund: string): number {
    // @ts-ignore
    return state.courses[fund].value
  }

  function getCrossCourses(from: string, to: string): number {
    // @ts-ignore
    return state.courses[from].value / state.courses[to].value
  }

  function getFundRoundSize(fund: string): number {
    // @ts-ignore
    return state.courses[fund].roundSize
  }

  return {
    getCurrentCourseInUsdByFund,
    getFundRoundSize,
    getCrossCourses,
    loadCourses,
    dictionaryState: state
  }
}
