const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());

const appContext = require.context('./src', true, /\.spec\.ts/);
appContext.keys().forEach(appContext);
