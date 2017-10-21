// tslint:disable:no-implicit-dependencies
import * as colors from 'colors';
import * as path from 'path';
import 'ts-helpers';
import { execCmd, packageJson } from './lib';

// tslint:disable-next-line:no-var-requires
const pckg = require(path.resolve(packageJson));

const main = async () => {
  try {
    await execCmd(`lerna publish --skip-git --skip-npm --yes --repo-version ${pckg.version}`);
  } catch (e) {
    console.error(colors.red(`Error : ${e.message}`));
    process.exit(1);
  }
};

main();
