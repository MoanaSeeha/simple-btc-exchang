<template lang="pug">
  div.col-lg-6.col-md-8.col-xl-4
    v-card.pa-5
      .row
        .col-6
          h2 Checkout
        .col-6
          nuxt-link(to="/").float-right.v-btn Back
      .row
        div.item.col-6
          .item__header You send
          .item__content {{ Number(pageState.sendAmount).toFixed(getFundRoundSize(pageState.sendFund)) }} {{ pageState.sendFund}}
          .item__footer-bold USD
        div.item.col-6
          div.item__header You get
          div.item__content ~ {{ Number(pageState.receiveAmount).toFixed(getFundRoundSize(pageState.receiveFund)) }} {{ pageState.receiveFund}}
          div.item__footer-bold blockchain: bitcoin
      v-divider.mt-3.mb-3
      .row
        div.item.col-6
          div.item__header Exchange Fee
          div.item__content {{ Number(pageState.exchangeFee).toFixed(getFundRoundSize(pageState.receiveFund)) }} {{ pageState.receiveFund}}
          div.item__footer The exchange fee is already included in the displayed amount you'll get
        div.item.col-6
          div.item__header Network Fee
          div.item__content {{ Number(pageState.networkFee).toFixed(getFundRoundSize(pageState.receiveFund)) }} {{ pageState.receiveFund}}
          div.item__footer The network fee is already included in the displayed amount you'll get
      .row
        div.item.col-6
          div.item__header Recipient address
          div.item__content {{ pageState.recipientAddress }}
        div.item.col-6
          div.item__header Exchange rate
          div.item__content 1 {{ pageState.sendFund }} ~ {{ pageState.exchangeRate}} {{ pageState.receiveFund}}
          div.item__footer The network fee is already included in the displayed amount you'll get
</template>

<script>
import { reactive, useRoute } from '@nuxtjs/composition-api'
import { useDictionary } from '~/compositions'

export default {
  name: 'Success',
  setup() {
    const route = useRoute()
    const { getFundRoundSize } = useDictionary()

    const pageState = reactive(Object.assign({}, route.value.query))

    return {
      pageState,
      getFundRoundSize
    }
  }
}
</script>
<style lang="scss">
.item {
  &__header {
    color: #8d8d8d;
  }

  &__content {
    font-size: 16px;
    font-weight: bold;
  }

  &__footer-bold {
    font-size: 12px;
    font-weight: bold;
    color: lightseagreen;
  }

  &__footer {
    font-size: 10px;
    color: #8d8d8d;
  }
}
</style>
