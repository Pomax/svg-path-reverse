import { normalizePath } from './normalizePath.js';
import { reverseNormalizedPath } from './reverseNormalizedPath.js';

/**
 * This is the function that you'll actually want to
 * make use of, because it lets you reverse individual
 * subpaths in some <path> "d" attribute.
 *
 * @param path {string} The path to reverse.
 * @param subPathIndex {number=} The index of the subPath to reverse.
 */
export function reverseSubPath(path, subPathIndex) {
  const subpath = parseInt(subPathIndex) == subPathIndex ? subPathIndex : false;
  let normalizedPath = normalizePath(path),
    paths = normalizedPath.replace(/M/g, '|M').split("|"),
    revpath;
  paths.splice(0,1);
  if (subpath !== false && subpath >= paths.length) {
    return normalizedPath;
  }

  if (subpath === false) {
    paths = paths.map(function(spath) {
      return reverseNormalizedPath(spath.trim());
    });
  } else {
    var spath = paths[subpath];
    if (spath) {
      revpath = reverseNormalizedPath(spath.trim());
      paths[subpath] = revpath;
    }
  }

  return paths.reverse().join(" ").replace(/ +/g,' ').trim();
}