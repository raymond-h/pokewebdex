import path from 'path';
import Promise from 'bluebird';
import Absurd from 'absurd';

import style from '../client/style.js';

Promise.try(async () => {
    const absurd = Absurd().add(style);

    await Promise.fromNode(absurd.compileFile.bind(absurd, path.join(__dirname, '../public/index.css')));

}).done();
