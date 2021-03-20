export default function ({ store, redirect, route }) {
  if (store.state.user != null && route.path === '/login') redirect('/admin')
  if (store.state.user == null && isAdminRoute(route)) redirect('/login')
}

function isAdminRoute(route) {
  if (route.matched.some((record) => record.path === '/admin')) {
    return true
  }
}
