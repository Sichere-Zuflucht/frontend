// export default function ({ store, redirect }) {
//   console.log('is woman?', store.getters['modules/ssr/membership'])
//   if (store.getters['modules/ssr/membership'] !== 'Woman') {
//     console.log('is no woman')
//     return redirect('/')
//   }
// }

export default function ({ store, redirect, route, router }) {
  if (route.path === '/profile' && process.client) {
    if (!store.getters['modules/user/isAuthenticated']) {
      return redirect('/signup')
    }
    return redirect(store.getters['modules/user/routing'])
  }
}
