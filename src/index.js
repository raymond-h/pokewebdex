import path from 'path';

import express from 'express';
import serveStatic from 'serve-static';
import morgan from 'morgan';

import params from './params';
import routes from './routes';

const app = express();

app.use(morgan());
app.use(serveStatic(path.join(__dirname, '..', 'public')));

params(app);
routes(app);

app.listen(80);
