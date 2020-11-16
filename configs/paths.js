const path = require('path');
const fs = require('fs');

const appDir = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDir, relativePath);

module.exports = {
  src: resolvePath('src'),
  build: resolvePath('build'),
  public: resolvePath('public'),
  nodeModules: resolvePath('node_modules'),
  packageJsonFile: resolvePath('package.json'),
  dotenvFile: resolvePath('.env'),
  htmlTemplateFile: resolvePath('public/index.html'),
  appIndexFile: resolvePath('src/index.tsx'),
};
