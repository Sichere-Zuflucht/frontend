export default function ({ store, redirect }) {
  if (store.getters['modules/user/membership'] !== 'Woman') {
    return redirect('/profile')
  }
}
