var utils = require('./reverse.js'),
    reverse = utils.reverseSubPath,
    normalize = utils.normalizePath;

var path ="m0 0l10 0 0 10 -10 0z";
var normalized = normalize(path);
var reversed = reverse(path);
var reversed2 = reverse(reversed);

//console.log(normalized);
//console.log(reversed);
//console.log(reversed2);

if (normalized === reversed) process.exit(1);
if (normalized !== reversed2) process.exit(1);
