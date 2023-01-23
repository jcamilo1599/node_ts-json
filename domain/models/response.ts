import {Order} from "./order";

export interface UsersFilePLURespModel {
    status: number,
    message: string,
    data?: Order,
}