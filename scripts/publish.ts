// tslint:disable:no-implicit-dependencies
import * as colors from 'colors';
import * as minimist from 'minimist';
import * as path from 'path';
import 'ts-helpers';
import {
  defaultPackageDir,
  defaultPackageDistDir,
  defaultReleaseBranch,
  execCmd,
  IPackage,
  packageJson,
  readPath,
  writeNpmrcFile,
} from './lib';

const argv = minimist(process.argv.slice(2));

const cwd = process.cwd();
const currentBranch = process.env.TRAVIS_BRANCH;
const packageDir: string = argv.p || argv.packages || defaultPackageDir;
const packageDistDir: string = argv.d || argv.dist || defaultPackageDistDir;
const releaseBranch: string = argv.b || argv.branch || defaultReleaseBranch;

const checkModulePublished = async (pckg: IPackage) => {
  try {
    const version = require(path.join(pckg.path, packageJson)).version;
    console.info(colors.green(`${pckg.name} version ${version}`));
    const versions: string[] = JSON.parse(await execCmd(`yarn info ${pckg.name} versions --json`)).data;
    return versions.indexOf(version) >= 0;
  } catch (e) {
    console.error(colors.red(`Error : ${e}`));
    return false;
  }
};

const main = async () => {
  try {
    const packagesPath = path.join(cwd, packageDir);
    const packages = (await readPath(packagesPath))
      .map((name) => ({
        name: require(path.join(packagesPath, name, packageJson)).name,
        path: path.join(packagesPath, name),
      }));

    packages.forEach(async (pckg) => {
      if (!await checkModulePublished(pckg)) {
        console.info(colors.yellow(`Package never published ${pckg.name}`));
        if (currentBranch === releaseBranch) {
          try {
            const packageDistPath = path.join(pckg.path, packageDistDir);
            await writeNpmrcFile(packageDistPath);
            await execCmd(`cd ${packageDistPath} && npm publish`, {
              env: {
                NPM_TOKEN: process.env.NPM_TOKEN,
              },
            });
          } catch (e) {
            console.error(colors.red(`Error : ${e}`));
          }
        } else {
          console.info(colors.green(`Skipping publish as on; ${currentBranch}`));
        }
      } else {
        console.info(colors.green(`${pckg.name} already published`));
      }
    });
  } catch (e) {
    console.error(colors.red(`Error : ${e.message}`));
    process.exit(1);
  }
};

main();
