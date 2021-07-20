export default function ({ store, redirect }) {
  console.log('im called', store.getters['modules/user/membership'].id)
  if (store.getters['modules/user/membership'] === 'coach') {
    return redirect('/')
  }
}
