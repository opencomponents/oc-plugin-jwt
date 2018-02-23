module.exports = keys => ({
  getSecretOrPublicKey(keyName, callback) {
    if (keys[keyName] && keys[keyName].publicKey) {
      return callback(null, keys[keyName].publicKey);
    }
    if (keys[keyName] && keys[keyName].secret) {
      return callback(null, keys[keyName].secret);
    }
    callback(new Error(`Key ${keyName} not found`));
  }
});
