export default function ({ store, redirect, route }) {
  if (route.path === '/profile' && process.client) {
    if (!store.getters['modules/user/isAuthenticated']) {
      return redirect('/signup')
    }
    return redirect(store.getters['modules/user/routing'])
  }
}
