import { NuxtAxiosInstance } from '@nuxtjs/axios'

export type CourseResponse = {
  coin: {
    price: number
  }
}

export const externalApiRepository = (axios: NuxtAxiosInstance) => ({
  async loadCourses(): Promise<CourseResponse> {
    return await axios.$get(
      // 'https://api.coinbase.com/v2/prices/spot?currency=USD'
      'https://api.coinstats.app/public/v1/coins/bitcoin?currency=UDS'
    )
  }
})

export type ExternalApiRepository = ReturnType<typeof externalApiRepository>
