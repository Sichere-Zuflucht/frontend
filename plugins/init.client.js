export default async function ({ store, app }) {
  // check if spa fallback, by checking if a value in store is empty for example
  if (!store.state.modules.user?.public?.uid) {
    await store.dispatch('modules/user/nuxtServerInit', app.context)
  }
}
