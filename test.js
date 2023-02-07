var utils = require(`./reverse.js`),
    reverse = utils.reverse,
    normalize = utils.normalize,
    path, normalized, prenormalized, reversed;

function fail(why) {
    console.log(`failed test: `, why);
    process.exit(1);
}

path =`m0 0l10 0 0 10 -10 0z`;
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) fail(`mlz`);


path =`m0 0l10 0 0 10 -10 0z m10 10l10 0 0 10 -10 0z`;
normalized = normalize(path);
if (normalized !== reverse(reverse(normalized))) fail(`ml+ml+z`);


path = `M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832 Z`;
reversed = `M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832 Z`;
if (reversed !== reverse(path)) fail(`closed cubic (reverse)`);
if (path !== reverse(reverse(path))) fail(`closed cubic (round trip)`);


path = `M 4071.500009 1708.150832 C 4071.500009 1708.150832 4030.000009 1770.650832 3988.500009 1794.150832`;
reversed = `M 3988.500009 1794.150832 C 4030.000009 1770.650832 4071.500009 1708.150832 4071.500009 1708.150832`;
if (reversed !== reverse(path)) fail(`open cubic (reverse)`);
if (path !== reverse(reverse(path))) fail(`open cubic (round trip)`);


path = `M 600 350 L 650 325 A 25 25 -30 0 1 700 300 L 750 275`;
reversed = `M 750 275 L 700 300 A 25 25 -30 0 0 650 325 L 600 350`;
if (reversed !== reverse(path)) fail(`prenormalized arc (reverse)`);
if (path !== reverse(reverse(path))) fail(`prenormalized arc (round trip)`);


path = `m 0 0 a 5.5 5.5 0 01100-11 z`;
prenormalized = `M 0 0 A 5.5 5.5 0 0 1 100 -11 Z`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`collapsed flag arc (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`collapsed flag arc (round trip)`);


path = `m 0 0 a 5.5 5.5 0 0 1100-11 z`;
prenormalized = `M 0 0 A 5.5 5.5 0 0 1 100 -11 Z`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`partially collapsed flag arc (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`partially collapsed flag arc (round trip)`);


path = `m 1e1 0 l 0 10`;
prenormalized = `M 10 0 L 10 10`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`scientific notation, lowercase, positive exponent(normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`scientific notation, lowercase, positive exponent (round trip)`);


path = `m 1E-1 0 l 10 10`;
prenormalized = `M 0.1 0 L 10.1 10`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`scientific notation, uppercase, negative exponent (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`scientific notation, uppercase, negative exponent (round trip)`);


path = `M20 43c.027.07.074.119.139.144.067.028.131.037.191.026`;
prenormalized = `M 20 43 C 20.027 43.07 20.074 43.119 20.139 43.144 C 20.206 43.172 20.27 43.181 20.33 43.17`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`multiple decimal points (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`multiple decimal points (round trip)`);

path = `m0 0 L 100 0 L 1.0e2.1e3 L 200.0e-1.1e3 z`;
prenormalized = `M 0 0 L 100 0 L 100 100 L 20 100 Z`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`multiple decimal points with scientific notation (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`multiple decimal points with scientific notation (round trip)`);


path = `M249.834 243.462s120.037 20.777 149.95 26.898l129.125 22.26`;
prenormalized = `M 249.834 243.462 C 249.834 243.462 369.871 264.239 399.784 270.36 L 528.909 292.62`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`smooth cubic Bézier without previous Bézier (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`smooth cubic Bézier without previous Bézier`);


path = `M 110,90 c 20,0 15,-80 40,-80 s 20,80 40,80`;
prenormalized = `M 110 90 C 130 90 125 10 150 10 C 175 10 170 90 190 90`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`smooth cubic Bézier with previous Bézier (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`smooth cubic Bézier with previous Bézier`);


path = `M 25,25 t 15,25 30,0 30,0 30,0`
prenormalized = `M 25 25 Q 25 25 40 50 Q 55 75 70 50 Q 85 25 100 50 Q 115 75 130 50`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`quadratic Bézier without previous Bézier (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`quadratic Bézier without previous Bézier`);


path = `M 10,50 Q 25,25 40,50 t 30,0 30,0 30,0 30,0 30,0`
prenormalized = `M 10 50 Q 25 25 40 50 Q 55 75 70 50 Q 85 25 100 50 Q 115 75 130 50 Q 145 25 160 50 Q 175 75 190 50`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`quadratic Bézier with previous Bézier (normalize): ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail('quadratic Bézier with previous Bézier');


path = `M709.199 505.544s-.976 9.675-1.278 16.435c-.548 12.234-.365 28.121-4.383 43.643a185.035 185.035 0 01-11.321 31.59 109.855 109.855 0 01-4.566 8.766`;
prenormalized = `M 709.199 505.544 C 709.199 505.544 708.223 515.2189999999999 707.9209999999999 521.9789999999999 C 707.3729999999999 534.213 707.5559999999999 550.0999999999999 703.5379999999999 565.622 A 185.035 185.035 0 0 1 692.2169999999999 597.212 A 109.855 109.855 0 0 1 687.6509999999998 605.978`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`consecutive relative arcs: ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`consecutive relative arcs`);


path = "M36.592 228.917c-4.993-3.212-3.363-4.536-2.398-5.23 3.304-2.376 7.08-5.227 13.149-8.595 1.776-.986 4.037-.781 6.239-.543 5.658.612 4.348 2.899 10.847 5.413 2.351.91 23.499 1.06 34.135 4.311 7.789 2.382 27.368-1.502 40.242 2.793 5.359 1.788 47.585 2.343 54.693 2.343m146.545 16.202c.399 0 8.987.441 11.103 1.463 10.898 5.262 26.624 1.55 32.851 8.862 1.418 1.665 28.967 3.34 33.239 5.024 1.391.548 8.463 2.049 12.298 4.79 2.956 2.111 7.366 3.404 10.294 3.404"
prenormalized = "M 36.592 228.917 C 31.598999999999997 225.705 33.229 224.381 34.193999999999996 223.687 C 37.498 221.311 41.273999999999994 218.46 47.342999999999996 215.092 C 49.119 214.10600000000002 51.379999999999995 214.311 53.581999999999994 214.549 C 59.239999999999995 215.161 57.92999999999999 217.448 64.42899999999999 219.96200000000002 C 66.77999999999999 220.872 87.92799999999998 221.02200000000002 98.564 224.27300000000002 C 106.353 226.65500000000003 125.93199999999999 222.77100000000002 138.80599999999998 227.06600000000003 C 144.165 228.85400000000004 186.391 229.40900000000002 193.49899999999997 229.40900000000002 M 340.044 245.61100000000002 C 340.443 245.61100000000002 349.031 246.05200000000002 351.147 247.074 C 362.045 252.336 377.771 248.62400000000002 383.998 255.936 C 385.416 257.601 412.965 259.276 417.23699999999997 260.96 C 418.628 261.508 425.7 263.00899999999996 429.53499999999997 265.75 C 432.491 267.861 436.90099999999995 269.154 439.82899999999995 269.154"
normalized = normalize(path);
reversed = reverse(path);
if (normalized !== prenormalized) fail(`path with subpaths (normalize): ${normalized}`);
if (prenormalized !== reverse(reversed)) fail('path with subpaths');
var startX1, startX2, startY1, startY2, endX1, endX2, endY1, endY2;
var coordinateSplit = prenormalized.split(' ');
startX1 = coordinateSplit[1];
startY1 = coordinateSplit[2];
endY1 = coordinateSplit.pop();
endX1 = coordinateSplit.pop();
coordinateSplit = reversed.split(' ');
startX2 = coordinateSplit[1];
startY2 = coordinateSplit[2];
endY2 = coordinateSplit.pop();
endX2 = coordinateSplit.pop();
if (startX1 !== endX2 || startY1 !== endY2 || endX1 !== startX2 || endY1 !== startY2) fail('path with subpaths, start and endpoint mismatch')
