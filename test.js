var utils = require('./reverse.js'),
    reverse = utils.reverse,
    normalize = utils.normalize,
    path, normalized, prenormalized, reversed;

function fail(why) {
    console.log("failed test: ", why);
    process.exit(1);
}

path ="m0 0l10 0 0 10 -10 0z";
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) fail("mlz");


path ="m0 0l10 0 0 10 -10 0z m10 10l10 0 0 10 -10 0z";
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) fail("ml+ml+z");


path = "M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832 Z";
reversed = "M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832 Z";
if (reversed !== reverse(path)) fail("closed cubic (reverse)");
if (path !== reverse(reverse(path))) fail("closed cubic (round trip)");


path = "M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832";
reversed = "M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832";
if (reversed !== reverse(path)) fail("open cubic (reverse)");
if (path !== reverse(reverse(path))) fail("open cubic (round trip)");


path = "M 600 350 L 650 325 A 25 25 -30 0 1 700 300 L 750 275";
reversed = "M 750 275 L 700 300 A 25 25 -30 0 0 650 325 L 600 350";
if (reversed !== reverse(path)) fail("prenormalized arc (reverse)");
if (path !== reverse(reverse(path))) fail("prenormalized arc (round trip)");


path = "m 0 0 a 5.5 5.5 0 01100-11 z";
prenormalized = "M 0 0 A 5.5 5.5 0 0 1 100 -11 Z";
normalized = normalize(path);
if (normalized !== prenormalized) fail(`collapsed flag arc (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail("collapsed flag arc (round trip)");


path = "m 0 0 a 5.5 5.5 0 0 1100-11 z";
prenormalized = "M 0 0 A 5.5 5.5 0 0 1 100 -11 Z";
normalized = normalize(path);
if (normalized !== prenormalized) fail(`partially collapsed flag arc (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail("partially collapsed flag arc (round trip)");

path = "m 1e1 0 l 0 10";
prenormalized = "M 10 0 L 10 10";
normalized = normalize(path);
if (normalized !== prenormalized) fail(`scientific notation, lowercase, positive exponent(normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail("scientific notation, lowercase, positive exponent (round trip)");

path = "m 1E-1 0 l 10 10";
prenormalized = "M 0.1 0 L 10.1 10";
normalized = normalize(path);
if (normalized !== prenormalized) fail(`scientific notation, uppercase, negative exponent (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail("scientific notation, uppercase, negative exponent (round trip)");
