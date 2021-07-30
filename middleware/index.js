export default async function ({ store, redirect, route, app }) {
  await store.restored

  // /register is responsible for verifying the email address
  if (route.path === '/register' && !isSignInWithEmailLink(route))
    return redirect('/signup')

  // '/register/membership-selection' asks the user for additional information
  if (
    route.path === '/register/membership-selection' &&
    route.query.eMail === undefined
  ) {
    return redirect('/signup')
  }

  if (requiresAuth(route) && !isAuthenticated(store)) {
    console.log('requires auth')
    return redirect('/login')
  }

  if (requiresWoman(route) && !isWoman(store)) {
    console.log('requires woman')
    return redirect('/login')
  }

  if (requiresCoach(route) && !isCoach(store)) {
    console.log('requires coach')
    return redirect('/login')
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
  return [
    '/frauen',
    '/reset-password',
    '/settings',
    '/bezahlung',
    '/beratung',
  ].includes(route.path)
}

function isAuthenticated(store) {
  return !!store.getters['modules/user/isAuthenticated']
}

function requiresWoman(route) {
  return ['/frauen'].includes(route.path)
}

function isWoman(store) {
  return store.getters['modules/user/membership'] === 'Woman'
}

function requiresCoach(route) {
  return ['/beratung'].includes(route.path)
}

function isCoach(store) {
  return store.getters['modules/user/membership'] === 'Coach'
}
