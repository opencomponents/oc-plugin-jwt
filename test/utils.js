const jwt = require('jsonwebtoken');

const keys = {
  'test-with-public-key': {
    publicKey:
      '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxYCZdE0CttwcOk7ViyOJ\n' +
      'SQDky4DCjjIW6LhU/cfdIzSAkC+a1hdeD6EeMN9oUaToOcNOsHPJ1+AE47Tmvpvs\n' +
      'Hvy8/RN/MauyL1VIPxM9iWW92iJYOsBV/mZbg3sZLXUp6UiZQ6IbqpMAmHeT8u8z\n' +
      'vS9U5UMfXfSWszAmQ4EbOgap3alTe+TXULI48YBVX0cA2NSspyjCoRb96uz77HAe\n' +
      'klZEDtDr+WzfW1gswSrJAERMeGC1/cEX/RmdHPbN2PrOpOlvsHAsmWRc8j1U0rlT\n' +
      '2EooRzxm70lRPlN6oOeg7266+s5U7UlSbh4mIzj6+l06RQzO4LVcTsmvSpzpe57Q\n' +
      'LQIDAQAB\n' +
      '-----END PUBLIC KEY-----\n'
  },
  'test-with-secret': {
    secret: 'super-secret-password'
  }
};

const getTokenSignedWithPrivateKey = data => {
  const privateKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEpQIBAAKCAQEAxYCZdE0CttwcOk7ViyOJSQDky4DCjjIW6LhU/cfdIzSAkC+a\n' +
    '1hdeD6EeMN9oUaToOcNOsHPJ1+AE47TmvpvsHvy8/RN/MauyL1VIPxM9iWW92iJY\n' +
    'OsBV/mZbg3sZLXUp6UiZQ6IbqpMAmHeT8u8zvS9U5UMfXfSWszAmQ4EbOgap3alT\n' +
    'e+TXULI48YBVX0cA2NSspyjCoRb96uz77HAeklZEDtDr+WzfW1gswSrJAERMeGC1\n' +
    '/cEX/RmdHPbN2PrOpOlvsHAsmWRc8j1U0rlT2EooRzxm70lRPlN6oOeg7266+s5U\n' +
    '7UlSbh4mIzj6+l06RQzO4LVcTsmvSpzpe57QLQIDAQABAoIBAGtf5Q3TqHwd4sLY\n' +
    'hURmB4dHExyIXj3MgaP4Q0zN0i4HpzW8i+OFRMAeijlr3F022II+6pMIAF57Dm11\n' +
    'tlU+k/qs0VqNtQMeI3uUU/jmzvfZ9oOXVHxsgNQUdgBfdmq+XhDURW79vSjZTuOV\n' +
    'bzwOTAS4rOEPwwfjp+K3dLYShOjgLQ5RvizMlG4YJ5ctSRf31QzW2wuDw7fkT6uz\n' +
    '8BobaETUfD7uNDiKVtpbcCnMjXkxqf9mFbcosU/AlIbuHHYez6RiZ6/HeKW4Joxp\n' +
    '0tBb6m2o0pQ1/dt8F60oqaMXpCXOhTevjc3eaBw7u587Rkxxc7wNHRYwv2WOEyPX\n' +
    'W8CJcIkCgYEA9iaAhc92RE03uVeMd4rmStAHD9VHqX/f4dwOt7AAcDmnpmVJujFN\n' +
    '3koCuuZpK9nj7PwN9DKEefmPktTRF5TbQR27gqCmpjPfRGTdjoa8ljcZwvAnTF4F\n' +
    '+6BpJTM01tzjJHJsdJUfi/rMGRjTLFY/fr8X+YiGCtIyUn0N/fMfglMCgYEAzWfC\n' +
    'h3j/IHOpBCAh7zynUUg34QCeabRONIeqHpnYHm4WfP0+dcZZfnu5/L7F32H11xuG\n' +
    '5b0M/fG0+beCcgWP108X4c8HLudrDkJjpUmuzpqDLeEWRGqYDRU57/Mvij7JEcvf\n' +
    'TPTSjMs1QTJL5tA0b4nqmATIdiC2vczsI/5LE38CgYEA1E5VIBTWfwbS/0th3mGx\n' +
    'S+mtjZx5mNqwcZBqKUjmt+UiksReGPgZn5baT/YX1Di0/FxSdMN1u/biPNTOG7bK\n' +
    'fZl1d6+0zTmEYutUpW/VDQMtdxPH8XhPVL8AsZM/CeuvBmqi3NMaSJPioerliSJC\n' +
    '1cFgnluAsaimursd7GFcVf0CgYEAjMtEogukBSCCh9tmp0/R+HsiIk6ERzxaJtOf\n' +
    'Hl6hryoSrBYCTERrb7FraP1zMI07L/kkXDFbyG13eXv6JCH/2LvUSOnZqKLj1OBY\n' +
    '4SFCe0eaB0a0Nq1CECWukvUEbyReOp6eL2fZMrzPgiLxuAKbDqFgdldA+QeveyYN\n' +
    '7xYNbA0CgYEA0AVuPZasQS3IWvay0g46hfCjHJ6Sl3MNgYa1PfITDuit50t6s422\n' +
    '/6074el936687vembkvtvN68ja7IChD/hTbCCK8WGU5A59/y8l/A/QMROestbM6p\n' +
    'MMfBgyWcw3NZy/lNAZH0sw/bqmvf1dg79qxBSVTZSIrhywRbsL6FVbo=\n' +
    '-----END RSA PRIVATE KEY-----\n';
  return jwt.sign(data, privateKey, {
    algorithm: 'RS256',
    keyid: 'test-with-public-key',
    noTimestamp: true
  });
};

const getTokenSignedWithSecret = data => {
  return jwt.sign(data, 'super-secret-password', {
    algorithm: 'HS256',
    keyid: 'test-with-secret',
    noTimestamp: true
  });
};

const getTokenWithUnknownKey = data => {
  return jwt.sign(data, 'no-key-password', {
    algorithm: 'HS256',
    keyid: 'no-key',
    noTimestamp: true
  });
};

const getTokenThatHasBeenTamperedWith = data => {
  const newPayload = new Buffer(
    JSON.stringify({
      sub: '1234567890',
      name: 'Jane Doe',
      admin: true
    })
  ).toString('base64');

  const validToken = getTokenSignedWithPrivateKey(data);
  const [header, validPayload, signature] = validToken.split('.');
  return [header, newPayload, signature].join('.');
};

const getTokenWithMissingKeyId = data => {
  return jwt.sign(data, 'super-secret-password', {
    algorithm: 'HS256',
    noTimestamp: true
  });
};

module.exports = {
  keys,
  utils: {
    getTokenSignedWithPrivateKey,
    getTokenSignedWithSecret,
    getTokenWithUnknownKey,
    getTokenThatHasBeenTamperedWith,
    getTokenWithMissingKeyId
  }
};
