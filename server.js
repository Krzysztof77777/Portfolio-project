import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {
    fileURLToPath
} from 'url';

import startRouting from './server/routingServer.js';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.set('view engine', 'html');

app.listen(PORT);

startRouting(app);

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, "./build/index.html"));
})