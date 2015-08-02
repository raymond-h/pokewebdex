const path = require('path');
const Promise = require('bluebird');
const Absurd = require('absurd');

require('babel/register');

module.exports = function generateCss() {

    delete require.cache[require.resolve('../client/style.js')];
    const style = require('../client/style.js');

    const absurd = Absurd().add(style);

    return Promise.fromNode(absurd.compileFile.bind(absurd,
        path.join(__dirname, '../public/index.css')
    ));
};

if(require.main === module) { Promise.try(module.exports).done(); }
