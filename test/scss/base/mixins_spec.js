 var path = require('path');
var sassTrue = require('sass-true');

var sassFile = path.join(__dirname, '_mixins_spec.scss');
console.log(sassFile);
sassTrue.runSass({file: sassFile}, describe, it);
