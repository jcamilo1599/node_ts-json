import express from "express";

const {UsersFilePlu} = require("../../domain/use_cases/users/file-plu");

export class Handlers {
    public static Users(): express.Application {
        const app: express.Application = express();
        app.post('/users/file-plu', UsersFilePlu.instance);
        return app;
    }
}
