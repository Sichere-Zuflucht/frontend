export default function ({ store, redirect }) {
  if (store.getters['modules/user/membership'] === 'woman') {
    return redirect('/')
  }
}
