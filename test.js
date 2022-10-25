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
if (prenormalized !== reverse(reverse(path))) fail(`quadratic Bézier with previous Bézier`);

path = `M709.199 505.544s-.976 9.675-1.278 16.435c-.548 12.234-.365 28.121-4.383 43.643a185.035 185.035 0 01-11.321 31.59 109.855 109.855 0 01-4.566 8.766`;
prenormalized = `M 709.199 505.544 C 709.199 505.544 708.223 515.2189999999999 707.9209999999999 521.9789999999999 C 707.3729999999999 534.213 707.5559999999999 550.0999999999999 703.5379999999999 565.622 A 185.035 185.035 0 0 1 692.2169999999999 597.212 A 109.855 109.855 0 0 1 687.6509999999998 605.978`;
normalized = normalize(path);
if (normalized !== prenormalized) fail(`consecutive relative arcs: ${normalized}`);
if (prenormalized !== reverse(reverse(path))) fail(`consecutive relative arcs`);
