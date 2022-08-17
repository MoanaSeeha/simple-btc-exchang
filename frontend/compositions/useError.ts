import { reactive } from '@nuxtjs/composition-api'
import camelcaseKeys from 'camelcase-keys'
import { IServerError } from '@/types'

export default function useError() {
  const err: IServerError = {
    status: 0,
    message: '',
    errors: {
      objects: {}
    }
  }
  const state = reactive<IServerError>(err)

  const setError = (errors: IServerError) => {
    if (errors.status === 500) {
      alert('Server error ' + errors.status + errors.message)
      return
    }
    if (errors.message) {
      alert(errors.message)
    }
    if (errors.errors) {
      state.errors.objects = camelcaseKeys(errors.errors)
    }
  }

  function clearErrors() {
    state.errors.objects = {}
  }

  return {
    errors: state,
    setError,
    clearErrors
  }
}
