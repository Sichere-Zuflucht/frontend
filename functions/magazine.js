const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.saveArticle = functions.https.onCall(async (articleData) => {
  await admin.firestore().collection('articles').doc(articleData.docId).set({
    isPublished: articleData.isPublished,
    title: articleData.title,
    subtitle: articleData.subtitle,
    image: articleData.image,
    text: articleData.text,
    updatedAt: new Date(),
  })
})

exports.createArticle = functions.https.onCall(async (articleData) => {
  await admin.firestore().collection('articles').doc(articleData.newDoc).set({
    author: articleData.author,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})
