const jwt = require('jsonwebtoken');

const defaultKeyStore = require('./defaultKeyStore');

let keyStore;

module.exports = {
  register(options, callback) {
    if (options && options.keyStore) {
      keyStore = options.keyStore;
    } else {
      keyStore = defaultKeyStore(options);
    }
    return callback();
  },
  execute(token, callback) {
    try {
      const { header } = jwt.decode(token, { complete: true });
      if (!header || !header.kid) {
        return callback(new Error('Token missing key id (kid) in header'));
      }
      keyStore.getSecretOrPublicKey(header.kid, (err, secretOrPublicKey) => {
        if (err) {
          return callback(err);
        }
        return jwt.verify(token, secretOrPublicKey, callback);
      });
    } catch (e) {
      return callback(new Error('Invalid Token'));
    }
  }
};
