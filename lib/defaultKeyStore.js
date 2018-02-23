module.exports = ({ keys }) => ({
  getSecretOrPublicKey(keyId, callback) {
    if (keys[keyId] && keys[keyId].publicKey) {
      return callback(null, keys[keyId].publicKey);
    }
    if (keys[keyId] && keys[keyId].secret) {
      return callback(null, keys[keyId].secret);
    }
    callback(new Error(`Key ${keyId} not found`));
  }
});
