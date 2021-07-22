import isWoman from '@/middleware/isWoman'
import profile from '@/middleware/profile'

export default async function ({ store, redirect, route, app }) {
  await store.restored

  // /register is responsible for verifying the email address
  if (route.path === '/register' && !isSignInWithEmailLink(route)) redirect('/')

  // /update-profile asks the user for additional information
  if (route.path === '/update-profile' && route.query.eMail === undefined) {
    redirect('/signup')
  }

  if (route.path.startsWith('/frauen')) {
    return isWoman({ store, redirect })
  }

  profile({ store, redirect, route, router: app.router })
}

function isSignInWithEmailLink(route) {
  if (process.client) {
    // window.$nuxt.$fire is important here
    return window.$nuxt.$fire.auth.isSignInWithEmailLink(route.fullPath)
  }
  return false
}
