import { Context } from '@nuxt/types'
import {
  ApplicationRepository,
  applicationRepository,
  ExternalApiRepository,
  externalApiRepository
} from '@/api'

export type Repository = {
  application: ApplicationRepository
  externalApi: ExternalApiRepository
}

/**
 * @see https://axios.nuxtjs.org
 * @see https://github.com/gothinkster/realworld/tree/3155494efe68432772157de38a90c49b3698897f/api
 */
const createRepository = ({ app }: Context): Repository => {
  // @ts-ignore
  return {
    application: applicationRepository(app.$api),
    externalApi: externalApiRepository(app.$api)
  }
}

export default createRepository
