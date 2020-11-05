const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

module.exports = {
  presets: ['@babel/env', '@babel/react', '@babel/typescript'],
};
