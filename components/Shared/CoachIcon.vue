<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 45.4 45.4"
    style="enable-background: new 0 0 45.4 45.4"
    xml:space="preserve"
  >
    <path
      :style="'fill: ' + color"
      d="M22.68,2.26a17.09,17.09,0,0,0-17,17,29.42,29.42,0,0,0,3.2,12.06A7.08,7.08,0,0,1,14,29.13H31.34a7.09,7.09,0,0,1,5,2.08,27.31,27.31,0,0,0,3.35-11.9A17.16,17.16,0,0,0,22.68,2.26Zm3.08,24.07a9,9,0,0,1-3.08.53,9.36,9.36,0,0,1-1.41-.11l-.48-.09a9.27,9.27,0,1,1,5-.33Z"
    />
    <path
      :style="'fill: ' + color"
      d="M34,34.07v4.14a2,2,0,0,1-2,2H14a2,2,0,0,1-2-2V34.07a2,2,0,0,1,2-2h2.67l2.63-2,.36,2H32.07A2,2,0,0,1,34,34.07Z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#1A171B',
    },
  },
}
</script>
