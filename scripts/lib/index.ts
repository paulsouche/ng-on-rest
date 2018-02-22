// tslint:disable:no-implicit-dependencies
import * as childProcess from 'child_process';
import * as colors from 'colors';
import * as cpx from 'cpx';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { promisify } from 'util';

const mkdirpProm = promisify(mkdirp);
const readdirProm = promisify(fs.readdir);
const removePathProm = promisify(rimraf);
const copyPathProm = promisify(cpx.copy);
const writeFileProm = promisify(fs.writeFile);
const exec = childProcess.exec;

const isWin = process.platform.indexOf('win32') >= 0;

export interface IPackage {
  name: string;
  path: string;
}

export const defaultPackageDir = 'packages';

export const defaultReleaseBranch = 'master';

export const defaultPackageDistDir = 'dist';

export const defaultDemoDir = 'demo';

export const nodeModulesDir = 'node_modules';

export const packageJson = 'package.json';

export interface IExecCmdOptions extends childProcess.ExecOptions {
  encoding?: 'buffer' | BufferEncoding | string | null | undefined;
}

export const execCmd = async (cmd: string, options?: IExecCmdOptions) => new Promise<string>((res, rej) => {
  console.info(colors.yellow(`executing ${cmd}`));
  const stream = exec(cmd, options);
  let outBuffer = '';
  let errBuffer = '';

  stream.stdout.on('data', (chunk) => {
    const str = chunk.toString();
    outBuffer = outBuffer.concat(str);
    console.info(colors.green(str));
  });

  stream.stderr.on('data', (chunk) => {
    const str = chunk.toString();
    errBuffer = errBuffer.concat(str);
    console.error(colors.red(str));
  });

  stream.on('error', (err) => {
    return err
      ? rej(err)
      : res(err);
  });

  stream.on('exit', (code) => {
    return code === 0
      ? res(outBuffer)
      : rej(errBuffer);
  });
});

export const writeNpmrcFile = async (packageDistPath: string) => {
  const npmrcFile = path.join(packageDistPath, '.npmrc');
  const authTokenString = '//registry.npmjs.org/:_authToken=\${NPM_TOKEN}';
  await writeFileProm(npmrcFile, `${authTokenString}\n`);
};

export const readPath = async (p: string) => readdirProm(p);

export const removePath = async (p: string) => removePathProm(p);

export const copyPath = async (p: string, destPath: string) => copyPathProm(p.concat('/**/*'), destPath);

export const createPath = async (p: string) => mkdirpProm(p);

export const symLinkPath = async (p: string, destPath: string) => {
  return isWin
    ? execCmd(`mklink /J "${destPath}" "${p}"`)
    : execCmd(`ln -s ${p} ${destPath}`);
};

export const pathExists = async (p: string) => new Promise((res, rej) =>
  fs.exists(p, (exist) => exist ? res() : rej()));

export const pathIsSymLink = async (p: string) => new Promise((res, rej) =>
  fs.lstat(p, (err, stat) => !err && stat.isSymbolicLink() ? res() : rej()));
