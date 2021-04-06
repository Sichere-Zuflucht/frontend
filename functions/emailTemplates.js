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
