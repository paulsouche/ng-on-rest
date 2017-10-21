// tslint:disable:no-implicit-dependencies
import * as colors from 'colors';
import * as minimist from 'minimist';
import * as path from 'path';
import 'ts-helpers';
import {
  copyPath,
  createPath,
  defaultDemoDir,
  defaultPackageDir,
  defaultPackageDistDir,
  IPackage,
  nodeModulesDir,
  packageJson,
  pathExists,
  pathIsSymLink,
  readPath,
  removePath,
  symLinkPath,
} from './lib';

const argv = minimist(process.argv.slice(2));

const cwd = process.cwd();
const packageDir: string = argv.p || argv.packages || defaultPackageDir;
const packageDistDir: string = argv.d || argv.dist || defaultPackageDistDir;
const demoDir: string = argv.m || argv.demo || defaultDemoDir;

if (typeof packageDir !== 'string' || typeof packageDistDir !== 'string') {
  console.error(colors.red(`Cannot parse command params packages: ${packageDir} dist dir: ${packageDistDir}`));
  process.exit(1);
}

const linkDist = async (pckg: IPackage) => {
  const modulesPackagePath = path.join(cwd, nodeModulesDir, pckg.name);
  const packageDistPath = path.join(pckg.path, packageDistDir);
  try {
    await pathExists(modulesPackagePath);
    console.info(colors.green(`${modulesPackagePath} exists`));
    try {
      await pathIsSymLink(modulesPackagePath);
      console.info(colors.green(`${modulesPackagePath} is a symbolic link`));
    } catch (e) {
      console.info(colors.magenta(`${modulesPackagePath} is not a symbolic link`));
      await removePath(packageDistPath);
      await copyPath(modulesPackagePath, packageDistPath);
      await removePath(modulesPackagePath);
      await symLinkPath(packageDistPath, modulesPackagePath);
    }
  } catch (e) {
    console.info(colors.magenta(`${modulesPackagePath} does not exist`));
    try {
      await pathExists(packageDistPath);
      console.info(colors.green(`${packageDistPath} exists`));
      await symLinkPath(packageDistPath, modulesPackagePath);
    } catch (e) {
      console.info(colors.magenta(`${packageDistPath} does not exist: create it`));
      await createPath(packageDistPath);
      await symLinkPath(packageDistPath, modulesPackagePath);
    }
  }
};

const linkModules = async (pckg: IPackage) => {
  const packageModulesPath = path.join(pckg.path, nodeModulesDir);
  const modulesPath = path.join(cwd, nodeModulesDir);
  try {
    await pathExists(packageModulesPath);
    console.info(colors.green(`${packageModulesPath} exists`));
    try {
      await pathIsSymLink(packageModulesPath);
      console.info(colors.green(`${packageModulesPath} is a symbolic link`));
    } catch (e) {
      console.info(colors.magenta(`${packageModulesPath} is not a symbolic link`));
      await removePath(packageModulesPath);
      await symLinkPath(modulesPath, packageModulesPath);
    }
  } catch (e) {
    console.info(colors.magenta(`${packageModulesPath} does not exist`));
    await symLinkPath(modulesPath, packageModulesPath);
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
    packages.forEach((pckg) => {
      linkDist(pckg);
      linkModules(pckg);
    });
    linkModules({
      name: demoDir,
      path: path.join(process.cwd(), demoDir),
    });
  } catch (e) {
    console.error(colors.red(`Error : ${e.message}`));
    process.exit(1);
  }
};

main();
