## Development process

When starting a new feature/fix, you should create a new branch starting from the `master` branch
```
git checkout master
git checkout -b feat-NAME
git checkout -b fix-NAME
```

The name of the new branch should be `feature-NAME` or `fix-NAME`.

Once the feature/fix is done, you should make a pull request on Github.

## File naming convention

Files should be named like so, with all lower caps (no uppercase whatsoever):

<NAME>-<WITH>-<DASH>.<TYPE>.<EXTENSION>

Examples :

- components: controller-name.components.ts
- services: service-name.service.ts
- filter: name.filter.ts
- ...

## Commit messages

The commit message must folow the [angular commit message convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

An example of a commit message:
```
feat(auth): Login process

  Additional-details
```

Another example:
```
fix: Fix the bug

  Some more text if needed
```
