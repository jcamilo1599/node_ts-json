import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

import {Handlers} from './infrastructure/handlers/handlers';

app.use(bodyParser.json())
app.use(Handlers.Users())

app.listen(port, () => console.log(`Running in port ${port}`));