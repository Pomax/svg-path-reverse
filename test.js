var utils = require('./reverse.js'),
    reverse = utils.reverse,
    normalize = utils.normalize,
    path, normalized, reversed, reversed2;

function fail(code) {
    console.log("failed test ", code);
    process.exit(code);
}

path ="m0 0l10 0 0 10 -10 0z";
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) fail(1);

path ="m0 0l10 0 0 10 -10 0z m10 10l10 0 0 10 -10 0z";
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) fail(2);


path = "M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832 Z";
reversed = "M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832 Z";

if (reversed !== reverse(path)) fail(3);
if (path !== reverse(reverse(path))) fail(4);


path = "M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832";
reversed = "M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832";

if (reversed !== reverse(path)) fail(5);
if (path !== reverse(reverse(path))) fail(6);

path = "M 600 350 L 650 325 A 25 25 -30 0 1 700 300 L 750 275";
reversed = "M 750 275 L 700 300 A 25 25 -30 0 0 650 325 L 600 350";

if (reversed !== reverse(path)) fail(7);
if (path !== reverse(reverse(path))) fail(8);

