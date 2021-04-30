<template>
  <div>
    Call
    <v-btn @click="load">load</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async load() {
      await fetch('https://redclient.redmedical.de/service/video', {
        method: 'getEntryCodes',
        date: '2019-11-27',
        token: 'i am a key',
      }).then((e) => {
        console.log('err', e)
      })
    },
  },
}
</script>
