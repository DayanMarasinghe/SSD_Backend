const cryptojs = require("crypto-js");
function MessageAuthenticate(originalMessage, encryptedMessage) {
  //encrypt the original message
  var encryptedTest = cryptojs.SHA256(originalMessage).toString();

  if (encryptedTest === encryptedMessage) {
    return true;
  } else {
    return false;
  }
}

module.exports = MessageAuthenticate;
