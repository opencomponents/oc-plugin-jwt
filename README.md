# oc-plugin-jwt [![Greenkeeper badge](https://badges.greenkeeper.io/opencomponents/oc-plugin-jwt.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/opencomponents/oc-plugin-jwt.svg?branch=master)](https://travis-ci.org/opencomponents/oc-plugin-jwt)


[OpenComponents](https://github.com/opentable/oc) plugin for validating [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) inside OC components.

## Requirements
* Node version: min **6**
* [OC Registry](https://github.com/opentable/oc)

## Install

```bash
npm i oc-plugin-jwt --save
```

## Registry setup

More info about integrating OC plugins: [here](https://github.com/opentable/oc/wiki/Registry#plugins)


Registering using the simple in-memory keystore.

```js
const registry = oc.registry(configuration);

registry.register(
  {
    name: 'jwtVerify',
    register: require('oc-plugin-jwt').verify,
    options: {
      keys: {
        'key-id-1': {
          publicKey: fs.readFileSync('certificate.pem')
        },
        'key-id-2': {
          secret: 'super-secret-password'
        }
      }
    }
  },
  err => {
    if (err) {
      console.log('plugin initialisation failed:', err);
    } else {
      console.log('jwt verify now available');
    }
  }
);

registry.start(callback);
```

Or custom using a custom keystore
```js
const registry = oc.registry(configuration);

registry.register(
  {
    name: 'jwtVerify',
    register: require('oc-plugin-jwt').verify,
    options: {
      keyStore: {
        getSecretOrPublicKey(keyId, callback) {
          // Get the public key or secret by some method
          return callback(null, key);
        }
      }
    }
  },
  err => {
    if (err) {
      console.log('plugin initialisation failed:', err);
    } else {
      console.log('jwt verify now available');
    }
  }
);

registry.start(callback);
```

## Using it inside components

Example for a component's server.js:

```js
module.exports.data = (context, callback) => {
  const exampleToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS1pZC0yIn0.' +
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
    'bQVxleqAX7NQzI_RkIPFVfTl44-iEY0UYPUBm10789o';
  context.plugins.jwtVerify(exampleToken, (error, verifiedToken) => {
    if (error) {
      // Handle token verification errors
      callback(error);
    }
    callback(null, { verifiedToken: verifiedToken });
  });
};
```

## Generating Tokens

* [See Here](https://github.com/opencomponents/oc-plugin-jwt-examples)
