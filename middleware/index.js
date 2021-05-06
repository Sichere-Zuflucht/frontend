export default async function ({ store, redirect, route }) {
  // this makes sure the cookies are loaded, only first time is blocking,
  // because for continued calls the promise is already resolved
  await store.restored

  // /register is responsible for verifying the email address
  if (route.path === '/register' && !isSignInWithEmailLink(route))
    redirect('/signup')

  // /update-profile asks the user for additional information
  if (route.path === '/update-profile' && route.query.eMail === undefined) {
    redirect('/signup')
  }
  console.log('isAuth? ', store.getters['modules/user/isAuthenticated'])
  if (
    route.path === '/signup' &&
    store.getters['modules/user/isAuthenticated']
  ) {
    redirect('/profile')
  }

  redirectProfilePage(store, redirect, route)
}

function isSignInWithEmailLink(route) {
  if (process.client) {
    return this.$fire.auth.isSignInWithEmailLink(route.fullPath)
  }
  return false
}

function redirectProfilePage(store, redirect, route) {
  if (route.path === '/profile') {
    if (!store.getters['modules/user/isAuthenticated']) {
      return redirect('/signup')
    }

    // coach did not enter info what coaching he wants to do
    if (
      store.getters['modules/user/membership'].id === 'Coach' &&
      !store.getters['modules/user/user'].info
    ) {
      return redirect('/beratung/registrierung')
    }
    return redirect(store.getters['modules/user/routing'])
  }
}
