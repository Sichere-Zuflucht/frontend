function dateToString(date) {
  const d = new Date(date.date)
  const currDate = d.getDate()
  const currMonth = d.getMonth() + 1 // Months are zero based
  const currYear = d.getFullYear()
  return date
    ? date.time + ' ' + currDate + '.' + currMonth + '.' + currYear
    : ''
}
exports.coachInitialMail = (coachName, message, coachID) => {
  return {
    subject: 'Sichere Zuflucht - Anfrage von Frau',
    html: `<div style="font-size: 16px;">Hallo ${coachName},<br><br>
    eine Frau hat Ihnen eine Anfrage gestellt und schickt Ihnen folgende Nachricht:
    <br>
    <br>
    <span style="font-family: monospace; margin-left: 2em">"${message}"</span>
    <br>
    <br>
    Bitte loggen Sie sich auf unserer <a href="sichere-zuflucht.de">Plattform</a> ein, um Termine zur Auswahl zu
    stellen.
    <br>
    <br>
    Grüße von unserem engagierten Team.
    </div>`,
    uid: coachID,
    sent: false,
  }
}
function listToHTML(list) {
  return (
    '<ul>' +
    list
      .map(function (item) {
        return '<li>' + item + '</li>'
      })
      .join('') +
    '</ul>'
  )
}

exports.housingInitialMail = (name, content, userId) => {
  return {
    subject: 'Sichere Zuflucht - Anfrage von Frau',
    html: `<div style="font-size: 16px;">Wohnungssuche<br><br>
    ${name} sucht eine Wohnung:
    <br>
    Angaben:
    ${content.place}<br>
    ${content.zip}<br>
    <br>
    Für ${content.amount} Person(en)<br>
    und gesamt ${content.price}€ pro Monat.<br>
    <br>
    Zeitraum: ${listToHTML(content.range)}<br>
    <br>
    Eine Liste an angefragten zusätzlichen Einrichtungen:
    ${listToHTML(content.features)}
    <br>
    <br>
    —
    <br>
    <span style="font-family: monospace; margin-left: 2em">"${
      content.message
    }"</span>
    <br>
    <br>
    Gesendet über das Wohnungsformular.
    </div>`,
    uid: userId,
    sent: false,
  }
}

exports.womanSuggestedDates = (coachName, dates, womanID) => {
  return {
    subject: `Sichere Zuflucht - Antwort von Coach ${coachName}`,
    html: `<div style="font-size: 16px;">Hallo,<br><br>
             der Coach ${coachName} hat auf Ihre Anfrage reagiert und schickt Ihnen folgende Terminvorschläge:
        <br>
        <span style="font-family: monospace;">${listToHTML(
          dates.map(dateToString)
        )}</span>
        <br>
        Bitte loggen Sie sich auf unserer <a href="sichere-zuflucht.de">Plattform</a> ein, um einen Termin auszuwählen.
        <br>
        <br>
        Grüße von unserem engagierten Team.
        </div>`,
    uid: womanID,
    sent: false,
  }
}

exports.coachAcceptedDate = (coachName, date, coachID) => {
  return {
    subject: `Sichere Zuflucht - Terminzusage`,
    html: `<div style="font-size: 16px;">Hallo ${coachName},<br><br>
             eine Frau hat Ihrem Termin zugesagt:
        <br>
        <br>
        <span style="font-family: monospace; margin-left: 2em">"${dateToString(
          date
        )}"</span>
        <br>
        <br>
        Bitte loggen Sie sich auf unserer <a href="sichere-zuflucht.de">Plattform</a> ein, um für den Termin den Videocall aufzusetzen.
        <br>
        <br>
        Grüße von unserem engagierten Team.
        </div>`,
    uid: coachID,
    sent: false,
  }
}

exports.verificationNotificationMail = (email, tel, www) => {
  return {
    subject: 'Sichere Zuflucht - Verifizierungsanfrage',
    html: `<div style="font-size: 16px;">Verifizierung Anfrage<br><br>
    eine Person möchte sich von uns Verifizieren lassen.
    <br>
    <span style="font-family: monospace; margin-left: 2em">"E-Mail: ${email}"</span>
    <span style="font-family: monospace; margin-left: 2em">"Tel: ${tel}"</span>
    <span style="font-family: monospace; margin-left: 2em">"Webseite: ${www}"</span>
    </div>`,
  }
}
exports.reqDeletedNotificationMail = (date) => {
  return {
    subject: 'Sichere Zuflucht - Anfrage abgesagt',
    html: `<div style="font-size: 16px;">Anfrage wurde abgesagt<br><br>
    Eine Frau hat Ihre Anfrage für den ${dateToString(date)} abgesagt.
    </div>`,
  }
}
