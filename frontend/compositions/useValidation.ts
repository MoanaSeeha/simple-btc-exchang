import { reactive } from '@nuxtjs/composition-api'

// @ts-ignore
const rules = reactive({
  required: (v: any) => !!v || 'is required',
  maxAmount: (v: number) => v <= 30 || "can't be greater than 30 USD",
  nonZero: (v: number) => v > 0 || 'must be greater than 0',
  emailRules: (v: any) => /.+@.+\..+/.test(v) || 'e-mail must be valid'
})

export default function useValidation() {
  return {
    rules
  }
}
