export default async function ({ store, redirect, route, app }) {
  await store.restored

  // /register is responsible for verifying the email address
  if (
    route.path === '/registration/confirm-register-link' &&
    !isSignInWithEmailLink(route)
  )
    return redirect('/registration/signup')

  // '/registration/membership-selection' asks the user for additional information
  if (
    route.path === '/registration/membership-selection' &&
    route.query.eMail === undefined
  ) {
    return redirect('/registration/signup')
  }

  if (requiresAuth(route) && !isAuthenticated(store)) {
    console.log('requires auth')
    return redirect('/registration/signin')
  }

  if (requiresWoman(route) && !isWoman(store)) {
    console.log('requires woman')
    return redirect('/')
  }

  if (requiresCoach(route) && !isCoach(store)) {
    console.log('requires coach')
    return redirect('/')
  }

  if (route.path === '/profile') {
    return redirect(store.getters['modules/user/routing'])
  }
}

function isSignInWithEmailLink(route) {
  if (process.client) {
    // window.$nuxt.$fire is important here
    return window.$nuxt.$fire.auth.isSignInWithEmailLink(route.fullPath)
  }
  return false
}

function requiresAuth(route) {
  return ['frauen', 'settings', 'bezahlung', 'beratung'].includes(
    route.path.split('/')[1]
  )
}

function isAuthenticated(store) {
  return !!store.getters['modules/user/isAuthenticated']
}

function requiresWoman(route) {
  return route.path.startsWith('/frauen/')
  // return ['/frauen'].includes(route.path)
}

function isWoman(store) {
  return store.getters['modules/user/membership'] === 'Woman'
}

function requiresCoach(route) {
  return route.path.startsWith('/beratung')
}

function isCoach(store) {
  return store.getters['modules/user/membership'] === 'Coach'
}
