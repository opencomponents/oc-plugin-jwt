const { keys, utils } = require('../test/utils');

const dataToTokenzie = {
  admin: true,
  name: 'John Doe',
  sub: '1234567890'
};

describe('verify', () => {
  describe('when given a valid public key signed token', () => {
    const token = utils.getTokenSignedWithPrivateKey(dataToTokenzie);

    it('returns the verified token with no errors', () => {
      const verify = require('./verify');
      verify.register({ keys }, {}, () => {});
      verify.execute(token, (error, verifiedToken) => {
        expect(error).toBe(null);
        expect(verifiedToken).toMatchSnapshot();
      });
    });
  });

  describe('when given a valid secret signed token', () => {
    const token = utils.getTokenSignedWithSecret(dataToTokenzie);

    it('returns the verified token with no errors', () => {
      const verify = require('./verify');
      verify.register({ keys }, {}, () => {});
      verify.execute(token, (error, verifiedToken) => {
        expect(error).toBe(null);
        expect(verifiedToken).toMatchSnapshot();
      });
    });
  });

  describe('when a key is not found in the keystore', () => {
    const token = utils.getTokenWithUnknownKey(dataToTokenzie);

    it('it returns an error with no token', () => {
      const verify = require('./verify');
      verify.register({ keys }, {}, () => {});
      verify.execute(token, (error, verifiedToken) => {
        expect(error).toMatchSnapshot();
        expect(verifiedToken).toBe(undefined);
      });
    });
  });

  describe('when a using a custom keystore', () => {
    const token = utils.getTokenSignedWithSecret(dataToTokenzie);

    it('returns the verified token with no errors', () => {
      const verify = require('./verify');
      const options = {
        keyStore: {
          getSecretOrPublicKey(keyId, callback) {
            return callback(null, 'super-secret-password');
          }
        }
      };
      verify.register(options, {}, () => {});
      verify.execute(token, (error, verifiedToken) => {
        expect(error).toBe(null);
        expect(verifiedToken).toMatchSnapshot();
      });
    });
  });

  describe('when given a token that has been tampered with', () => {
    const token = utils.getTokenThatHasBeenTamperedWith(dataToTokenzie);

    it('it returns an error with no token', () => {
      const verify = require('./verify');
      verify.register({ keys }, {}, () => {});
      verify.execute(token, (error, verifiedToken) => {
        expect(error).toMatchSnapshot();
        expect(verifiedToken).toBe(undefined);
      });
    });
  });

  describe('when given a string that is not a token', () => {
    const token = 'i am not a token';

    it('it returns an error with no token', () => {
      const verify = require('./verify');
      verify.register({ keys }, {}, () => {});
      verify.execute(token, (error, verifiedToken) => {
        expect(error).toMatchSnapshot();
        expect(verifiedToken).toBe(undefined);
      });
    });
  });

  describe('when given a token that is missing the key id', () => {
    const token = utils.getTokenWithMissingKeyId(dataToTokenzie);

    it('it returns an error with no token', () => {
      const verify = require('./verify');
      verify.register({ keys }, {}, () => {});
      verify.execute(token, (error, verifiedToken) => {
        expect(error).toMatchSnapshot();
        expect(verifiedToken).toBe(undefined);
      });
    });
  });
});
