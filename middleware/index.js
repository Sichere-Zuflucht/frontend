export default function ({ store, redirect, route }) {
  if (route.path === '/register' && !isSignInWithEmailLink(route))
    redirect('/signup')
  if (route.path === '/update-profile' && route.query.eMail === undefined) {
    redirect('/signup')
  }
}

function isSignInWithEmailLink(route) {
  if (process.client) {
    return window.$nuxt.$fire.auth.isSignInWithEmailLink(route.fullPath)
  }
  return false
}
