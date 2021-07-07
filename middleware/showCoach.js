export default function ({ store, redirect, route }) {
  if (
    store.getters['modules/user/uid'] !== route.params.beratung &&
    store.getters['modules/user/readyToShow']
  ) {
    return redirect('/')
  }
}
