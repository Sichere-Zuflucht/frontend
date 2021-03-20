export default function ({ store, redirect, route }) {
  if (route.path === '/register' && !isSignInWithEmailLink(route))
    redirect('/login')

  if (route.path === '/update-profile' && route.query.eMail === undefined) {
    redirect('/login')
  }

  if (route.path === '/login' && store.state.user) {
    redirect('/')
  }
}

function isSignInWithEmailLink(route) {
  if (process.client) {
    return window.$nuxt.$fire.auth.isSignInWithEmailLink(route.fullPath)
  }
  return false
}
