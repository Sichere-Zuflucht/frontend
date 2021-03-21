<template>
  <h1>{{ slug }}</h1>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = params.beratung // When calling /abc the slug will be "abc"
    const db = await fetch('')
    console.log(params, db)
    return { slug }
  },
}
</script>
