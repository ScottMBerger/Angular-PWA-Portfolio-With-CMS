import * as express from 'express';
import * as path from 'path';
import * as prerender from 'prerender-node';
import * as compression from 'compression';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.use(prerender);
app.use(compression());
app.use(express.static(path.join(__dirname, '/dist/folio')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/folio/index.html'));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
