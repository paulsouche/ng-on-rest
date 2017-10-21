export function platformNavigatorFactory() {
  if (window && window.navigator) {
    return window.navigator;
  }
  throw new Error('platformNavigatorFactory: cannot find global navigator !');
}
