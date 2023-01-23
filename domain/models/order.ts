export interface Orders {
    id: string;
    index: number;
    guid: string;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    registered: string;
    latitude: number;
    longitude: number;
    orders: Order[];
}

export interface Order {
    id: string;
    details: Detail[];
}

export interface Detail {
    datilId: string;
    pluId: number;
    quantity: number;
}