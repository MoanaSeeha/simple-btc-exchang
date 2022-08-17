import { BuildDealResponse } from '~/api'

export interface IServerError {
  status: number
  message: string
  errors: {
    objects: {}
  }
}

export interface ISuccessDeal extends BuildDealResponse {}
