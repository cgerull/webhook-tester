const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';
const secretString = process.env.SECRET || 'myTestSecret';

const config = {
  development: {
    root: rootPath,
    secret: secretString,
    app: {
      name: 'webHook-dev'
    },
    port: process.env.PORT || 3000,
  },

  test: {
    root: rootPath,
    secret: secretString,
    app: {
      name: 'webHook-test'
    },
    port: process.env.PORT || 3000,
  },

  production: {
    root: rootPath,
    secret: secretString,
    app: {
      name: 'webHookTester'
    },
    port: process.env.PORT || 80,
  }
};

module.exports = config[env];
