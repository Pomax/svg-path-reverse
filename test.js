var utils = require('./reverse.js'),
    reverse = utils.reverse,
    normalize = utils.normalize;

var path ="m0 0l10 0 0 10 -10 0z";
var normalized = normalize(path);
var reversed = reverse(path);
var reversed2 = reverse(reversed);

//console.log(normalized);
//console.log(reversed);
//console.log(reversed2);

if (normalized === reversed) process.exit(1);
if (normalized !== reversed2) process.exit(1);


path ="m0 0l10 0 0 10 -10 0z m10 10l10 0 0 10 -10 0z";
normalized = normalize(path);
reversed = reverse(path, 1);
reversed2 = reverse(reversed, 1);

//console.log(normalized);
//console.log(reversed);
//console.log(reversed2);

if (normalized === reversed) process.exit(1);
if (normalized !== reversed2) process.exit(1);
