export default function ({ store, redirect, route }) {
  if (route.path === '/register' && !isSignInWithEmailLink(route))
    redirect('/login')

  if (route.path === '/update-profile' && route.query.eMail === undefined) {
    redirect('/login')
  }

  if (route.path === '/login' && store.state.user) {
    redirect('/')
  }

  redirectProfil(store, redirect, route)
}

function isSignInWithEmailLink(route) {
  if (process.client) {
    return window.$nuxt.$fire.auth.isSignInWithEmailLink(route.fullPath)
  }
  return false
}

function redirectProfil(store, redirect, route) {
  if (route.path === '/profile') {
    store.state.user.membership.get().then((doc) => {
      redirect(doc.data().routing)
    })
    redirect('/')
  }
}
