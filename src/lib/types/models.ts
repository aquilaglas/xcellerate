export type OtherData = Record<string, string>;

export type Customer = {
    id: string;
    userId: string;
    name: string;
    addresses: Array<string>;
    type: string;
    contacts: Array<string>;
    containerType: string;
    status: string;
    lastCommunication: string | null;
    priority: string;
    comments: Array<string>;
    otherData: OtherData;
    createdAt: string;
    updatedAt: string;
};

export type Contact = {
    id: string;
    customerId: string;
    userId: string;
    name: string;
    email: string | null;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
};

export type Sheet = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    customerIds: Array<string>;
    createdAt: string;
    updatedAt: string;
};
