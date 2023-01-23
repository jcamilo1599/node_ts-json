import express from "express";
import {Order, Orders} from "../../models/order";
import {UsersFilePLUBodyModel} from "../../models/body";
import * as fs from "fs";
import path from "path";
import {UsersFilePLURespModel} from "../../models/response";

export class UsersFilePlu {
    static async instance(req: express.Request, res: express.Response): Promise<any> {
        const body: UsersFilePLUBodyModel = <UsersFilePLUBodyModel>req.body;
        const response: UsersFilePLURespModel = await UsersFilePlu.readFile(body);

        res.status(response.status).json(response);
    }

    private static async readFile(body: UsersFilePLUBodyModel): Promise<UsersFilePLURespModel> {
        const response: UsersFilePLURespModel = {
            status: 200,
            message: ''
        };

        if (body.userId) {
            const userId = Buffer.from(body.userId, 'base64').toString('ascii');
            const filePath: string = path.resolve('./resources/orders.json');
            const allOrdersBuffer: string = fs.readFileSync(filePath, 'utf-8');
            const allOrders: [Orders] = JSON.parse(allOrdersBuffer);
            const orders: Orders | undefined = allOrders.find((order: Orders) => order.id === userId && order.isActive);

            if (orders) {
                const fileName: string | null = await UsersFilePlu.generateJSON(orders);

                if (fileName != null) {
                    response.status = 200;
                    response.message = `El nombre del archivo generado es: ${fileName}`;
                } else {
                    response.status = 404;
                    response.message = 'Se produjo un error generando el archivo';
                }
            } else {
                response.status = 404;
                response.message = 'No se encontro el cliente o no está activo';
            }
        } else {
            response.status = 404;
            response.message = 'No se recibio el ID del usuario';
        }

        return response;
    }

    private static async generateJSON(data: Orders): Promise<string | null> {
        const fileName: string = `${Date.now()}.json`;

        try {
            await fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8');
            return fileName;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}