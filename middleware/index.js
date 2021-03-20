export default function ({ store, redirect, route }) {
  if (route.path === '/register' && !isSignInWithEmailLink(route))
    redirect('/signup')
}

function isSignInWithEmailLink(route) {
  if (process.client) {
    return window.$nuxt.$fire.auth.isSignInWithEmailLink(route.fullPath)
  }
  return false
}
