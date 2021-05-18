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

exports.womanSuggestedDates = (coachName, dates, womanID) => {
  return {
    subject: `Sichere Zuflucht - Antwort von Coach ${coachName}`,
    html: `<div style="font-size: 16px;">Hallo,<br><br>
             der Coach ${coachName} hat auf Ihre Anfrage reagiert und schickt Ihnen folgende Terminvorschläge:
        <br>
        <span style="font-family: monospace;">${listToHTML(dates)}</span>
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
        <span style="font-family: monospace; margin-left: 2em">"${date}"</span>
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

exports.verificationNotificationMail = (email) => {
  return {
    subject: 'Sichere Zuflucht - Verifizierungsanfrage',
    html: `<div style="font-size: 16px;">Verifizierung Anfrage<br><br>
    eine Person möchte sich von uns Verifizieren lassen.
    <br>
    <span style="font-family: monospace; margin-left: 2em">"${email}"</span>
    </div>`,
  }
}
exports.reqDeletedNotificationMail = (date) => {
  return {
    subject: 'Sichere Zuflucht - Anfrage abgesagt',
    html: `<div style="font-size: 16px;">Anfrage wurde abgesagt<br><br>
    Eine Frau hat Ihre Anfrage für den ${date} abgesagt.
    </div>`,
  }
}
