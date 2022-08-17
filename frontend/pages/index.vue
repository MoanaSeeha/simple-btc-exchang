<template lang="pug">
  div.col-lg-6.col-md-8.col-xl-4
    v-card.pa-5
      v-form.myform(ref="form" lazy-validation :disabled="pageState.loading")
        h2 Calculate amount
        div.d-flex.justify-space-between
          v-text-field(
            v-model="sendAmount"
            label="You Send"
            required
            filled
            type="number"
            :rules="[rules.required, rules.maxAmount, rules.nonZero]"
            @focus="setActiveField(1)"
            @blur="onFieldBlur()"
            :error-messages='errors.objects.sendAmount'
          )
          div.ml-1
          v-select(
            v-model="sendFund"
            :items="dictionaryState.availableSendFunds"
            filled
            :label="sendFundLabel"
            :error-messages='errors.objects.sendFund'
          )
        .mb-5.detail-text
          v-icon.mr-1 mdi-lock-open
          span 1 {{sendFund}} = {{course}} {{receiveFund}}
          span
          span.ml-3
          a(href="#") All fees included
        div.d-flex.justify-space-between
          v-text-field(
            v-model="receiveAmount"
            label="You Get"
            required
            filled,
            :rules="[rules.required, rules.nonZero]"
            type="number"
            @focus="setActiveField(2)",
            @blur="onFieldBlur()"
            :error-messages='errors.objects.receiveAmount'
          )
          div.ml-1
          v-select(
            v-model="receiveFund"
            :items="dictionaryState.availableReceiveFunds"
            filled
            :label="receiveFundLabel")
        v-expansion-panels(v-model="pageState.panel" multiple)
          v-expansion-panel(expand)
            v-expansion-panel-header Detail
            v-expansion-panel-content
              namevalue(:name ="`Exchange fee ` + dictionaryState.exchangeFee * 100 +`%`", :value="exchangeFee + ` ` + receiveFund")
              namevalue(name ="Network fee", :value="currentNetworkFee + ` ` + receiveFund")
              namevalue(name ="Estimated arrival", value="5-30 minutes")
        h2.mt-4 Wallet address
        v-text-field(
          v-model="walletAddress"
          label="Recipient address"
          placeholder="Enter your BTC recipient address"
          required
          filled
          :rules="[rules.required]",
          :error-messages='errors.objects.walletAddress'

        )
          v-btn(slot="append" icon)
            v-icon mdi-help-circle-outline
        v-text-field(
          label="Recipient E-mail"
          placeholder="Enter your E-mail"
          required
          filled
          v-model="email"
          :rules="[rules.required, rules.emailRules]"
          :error-messages='errors.objects.email'

        )
        v-checkbox.mt-1(
          v-model="acceptRulesCheckbox"
          label="I agree with Terms of Use, Privacy Policy and AML/KYC"
          :rules="[rules.required]"
        )
        v-btn(block color="primary"
          @click="submitData"
          :loading="pageState.loading"
          :disabled="pageState.loading"
        ) Next step
</template>

<script>
import {
  reactive,
  toRefs,
  useFetch,
  useRouter,
  watch
} from '@nuxtjs/composition-api'
import {
  useApplication,
  useDictionary,
  useError,
  useValidation
} from '~/compositions'

export default {
  name: 'Index',
  setup(_, { refs }) {
    const {
      loadCourses,
      getFundRoundSize,
      getCrossCourses,
      dictionaryState
    } = useDictionary()

    const { rules } = useValidation()
    const { errors, setError, clearErrors } = useError()

    const { newDealState, buildDeal } = useApplication()
    const router = useRouter()

    const pageState = reactive({
      activeField: 1,
      panel: [0],
      loading: false
    })

    useFetch(async () => {
      pageState.loading = true
      await loadCourses()
        .then(() => {
          newDealState.course = getCrossCourses(
            newDealState.sendFund,
            newDealState.receiveFund
          ).toFixed(getFundRoundSize(newDealState.receiveFund))
        })
        .catch(e => {
          console.error(e)
        })
        .finally(() => (pageState.loading = false))
    })

    watch(
      () => newDealState.receiveFund,
      fund => {
        newDealState.currentNetworkFee = dictionaryState.networkFee[fund]
      },
      { immediate: true }
    )

    watch(
      () => newDealState.sendFund,
      () =>
        (newDealState.sendFundLabel =
          dictionaryState.fundsLabels[newDealState.sendFund]),
      { immediate: true }
    )

    watch(
      () => newDealState.receiveFund,
      () =>
        (newDealState.receiveFundLabel =
          dictionaryState.fundsLabels[newDealState.receiveFund]),
      { immediate: true }
    )

    watch(
      () => newDealState.sendAmount,
      newVal => {
        if (pageState.activeField === 1) {
          const crossCourse = newDealState.course
          newDealState.exchangeFee = (
            newVal *
            crossCourse *
            dictionaryState.exchangeFee
          ).toFixed(getFundRoundSize(newDealState.receiveFund))

          if (newVal === 0) {
            newDealState.receiveAmount = 0
            return
          }

          newDealState.receiveAmount = (
            newVal * crossCourse -
            newDealState.exchangeFee -
            newDealState.currentNetworkFee
          ).toFixed(getFundRoundSize(newDealState.receiveFund))
        }
      }
    )

    watch(
      () => newDealState.receiveAmount,
      newVal => {
        if (pageState.activeField === 2) {
          const crossCourse = 1 / newDealState.course
          newDealState.exchangeFee = (
            newVal / (1 - dictionaryState.exchangeFee) -
            newVal
          ).toFixed(getFundRoundSize(newDealState.receiveFund))

          if (newVal === 0) {
            newDealState.sendAmount = 0
            return
          }
          newDealState.sendAmount = (
            newVal * crossCourse +
            newDealState.exchangeFee * crossCourse +
            newDealState.currentNetworkFee * crossCourse
          ).toFixed(getFundRoundSize(newDealState.sendFund))
        }
      }
    )

    function onFieldBlur() {
      newDealState.sendAmount = Number(newDealState.sendAmount).toFixed(
        getFundRoundSize(newDealState.sendFund)
      )
      newDealState.receiveAmount = Number(newDealState.receiveAmount).toFixed(
        getFundRoundSize(newDealState.receiveFund)
      )
    }

    function setActiveField(activeField) {
      pageState.activeField = activeField
    }

    async function submitData() {
      clearErrors()
      if (!refs.form.validate()) {
        return false
      }
      pageState.loading = true

      await buildDeal()
        .then(response => {
          console.log(response)
          router.push({ path: '/success', query: response })
        })
        .catch(e => {
          setError(e.response.data)
        })
        .finally(() => {
          pageState.loading = false
        })
    }

    return {
      ...toRefs(newDealState),
      pageState,
      rules,
      submitData,
      setActiveField,
      dictionaryState,
      onFieldBlur,
      getCrossCourses,
      ...toRefs(errors)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-text {
  font-size: 14px;

  .v-icon {
    vertical-align: baseline;
    font-size: 16px !important;
  }
}

.vertical-baseline {
  vertical-align: baseline;
}
</style>
