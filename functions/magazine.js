const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.saveArticle = functions.https.onCall((articleData) => {
  admin.firestore().collection('articles').add({
    isPublished: articleData.isPublished,
    author: articleData.author,
    title: articleData.title,
    subtitle: articleData.subtitle,
    image: articleData.image,
    text: articleData.text,
  })
})
