import firebase from 'firebase/app'
import 'firebase/app-check'

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyDMjjzgxNWEsDWYETgWbFgaYnwzAmLyzhM',
    authDomain: 'sicherezuflucht.firebaseapp.com',
    projectId: 'sicherezuflucht',
    storageBucket: 'sicherezuflucht.appspot.com',
    messagingSenderId: '163834643967',
    appId: '1:163834643967:web:277673f1c69b5eaf3213ca',
  }

  firebase.initializeApp(config)
}

if (process.browser) {
  // get key from recaptcha https://firebase.google.com/docs/app-check/web

  const key = '6Lce-mUdAAAAALr7wGJvpTkhTOg9pffuGbONUXhr'
  const appCheck = firebase.appCheck()
  // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
  // key is the counterpart to the secret key you set in the Firebase console.
  appCheck.activate(key)
}
