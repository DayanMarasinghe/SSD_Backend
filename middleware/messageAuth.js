const cryptojs = require("crypto-js");
function MessageAuthenticate(originalMessage, encryptedMessage) {
  //encrypt the original message
  var encryptedTest = cryptojs.SHA256(originalMessage).toString();
  console.log("Org message : ", originalMessage);
  console.log("Recieved ciper : ", encryptedMessage);
  console.log("Generated ciper : ", encryptedTest);
  if (encryptedTest === encryptedMessage) {
    return true;
  } else {
    return false;
  }
}

module.exports = MessageAuthenticate;
