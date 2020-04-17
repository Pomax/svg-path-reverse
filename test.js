var utils = require('./reverse.js'),
    reverse = utils.reverse,
    normalize = utils.normalize,
    path, normalized, reversed, reversed2;

path ="m0 0l10 0 0 10 -10 0z";
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) process.exit(1);

path ="m0 0l10 0 0 10 -10 0z m10 10l10 0 0 10 -10 0z";
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) process.exit(2);


path = "M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832 Z";
reversed = "M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832 Z";

if (reversed !== reverse(path)) process.exit(3);
if (path !== reverse(reverse(path))) process.exit(4);


path = "M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832";
reversed = "M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832";

if (reversed !== reverse(path)) process.exit(5);
if (path !== reverse(reverse(path))) process.exit(6);
