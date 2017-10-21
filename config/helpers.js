const path = require('path');
const ROOT = process.cwd();

module.exports = {
  checkNodeImport: (context, request, cb) => {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      cb(null, 'commonjs ' + request); return;
    }
    cb();
  },
  hasProcessFlag: (flag) => process.argv.join('').indexOf(flag) > -1,
  isWebpackDevServer: () => process.argv[1] && !!(/webpack-dev-server$/.exec(process.argv[1])),
  root: (...args) => path.join.apply(path, [ROOT].concat(args)),
};
