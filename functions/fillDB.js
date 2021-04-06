const admin = require('firebase-admin')
admin.initializeApp({ projectId: 'sicherezuflucht' })

admin.firestore().collection('memberships').doc('Coach').set({
  description: 'Ich möchte beratend tätig werden.',
  id: 'Coach',
  name: 'Berater',
  routing: 'beratung',
})

admin.firestore().collection('memberships').doc('Woman').set({
  description: 'Ich möchte Beratung in Anspruch nehmen.',
  id: 'Woman',
  name: 'Frau',
  routing: 'frauen',
})

admin
  .firestore()
  .collection('coachingTypes')
  .doc('coachingmotivation')
  .set({
    area: ['here', 'some text'],
    title: 'Coaching zur Motivation',
  })
admin
  .firestore()
  .collection('coachingTypes')
  .doc('individuell')
  .set({
    area: ['asdf', 'ass', 'asljojo'],
    title: 'Individuelle Beratungsthemen',
  })
admin
  .firestore()
  .collection('coachingTypes')
  .doc('law')
  .set({
    area: ['Scheidung', 'Sorgerecht', 'Vermögen', 'Finanzen'],
    title: 'Rechtsberatung',
  })
admin
  .firestore()
  .collection('coachingTypes')
  .doc('psycholocialhelp')
  .set({
    area: ['sadfas', 'käoksök'],
    title: 'Psychologische Hilfe',
  })
