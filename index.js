/**
 * https://github.com/Pomax/svg-path-reverse
 *
 * This code is in the public domain, except in jurisdictions that do
 * not recognise the public domain, where this code is MIT licensed.
 */
import {normalizePath} from './normalizePath.js';
import {reverseNormalizedPath} from './reverseNormalizedPath.js';
import {reverseSubPath} from './reverseSubPath.js';

export default {
  normalize: normalizePath,
  reverseNormalized: reverseNormalizedPath,
  reverse: reverseSubPath
}

export {
  normalizePath as normalize,
  reverseNormalizedPath as reverseNormalized,
  reverseSubPath as reverse,
}