<template lang="pug">
  div
    span.name {{name}}
    span.mr-2
    span.value {{value}}
</template>
<script>
export default {
  name: 'Keyvalue',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    value: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  font-size: 14px;
  .name {
    color: #8d8c8c;
  }
}
</style>
