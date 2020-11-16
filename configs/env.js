const fs = require('fs');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const paths = require('./paths');

if (fs.existsSync(paths.dotenvFile)) {
  const env = dotenv.config({ path: paths.dotenvFile });
  dotenvExpand(env);
}

const getEnvironment = isRaw => {
  const raw = Object.keys(process.env).reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {});

  if (isRaw) return raw;

  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return stringified;
};

module.exports = getEnvironment;
