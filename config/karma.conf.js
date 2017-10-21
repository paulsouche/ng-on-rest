module.exports = (port) => {
  const testWebpackConfig = require('./webpack.test.js');

  return (config) => {
    var configuration = {
      autoWatch: false,
      basePath: '',
      browsers: [
        'Chrome',
      ],
      colors: true,
      coverageReporter: {
        type: 'in-memory',
      },
      customLaunchers: {
        ChromeTravisCi: {
          base: 'Chrome',
          flags: ['--no-sandbox'],
        },
      },
      exclude: [],
      files: [
        {
          pattern: '../../config/spec-bootstrap.js',
          watched: false,
        },
        {
          pattern: './spec-bundle.js',
          watched: false,
        },
      ],
      frameworks: ['jasmine'],
      logLevel: config.LOG_INFO,
      mochaReporter: {
        ignoreSkipped: true,
      },
      port,
      preprocessors: {
        '../../config/spec-bootstrap.js': ['webpack'],
        './spec-bundle.js': ['coverage', 'webpack', 'sourcemap'],
      },
      remapCoverageReporter: {
        html: './coverage/html',
        json: './coverage/coverage.json',
        'text-summary': null,
      },
      reporters: ['mocha', 'coverage', 'remap-coverage'],
      singleRun: true,
      webpack: testWebpackConfig,
      webpackMiddleware: {
        stats: 'errors-only',
      },
    };

    if (process.env.TRAVIS) {
      configuration.browsers = [
        'ChromeTravisCi',
      ];
    }

    config.set(configuration);
  };
}

