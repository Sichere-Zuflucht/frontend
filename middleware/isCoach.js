export default function ({ store, redirect }) {
  if (store.getters['modules/user/membership'] !== 'Coach') {
    return redirect('/profile')
  }
}
