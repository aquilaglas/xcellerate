import type {Customer, Contact, Sheet, OtherData} from "$lib/types/models.js";

export type CustomerRow = {
    id: string;
    user_id: string;
    name: string;
    addresses: Array<string>;
    type: string;
    contacts: Array<string>;
    container_type: string;
    status: string;
    last_communication: string | null;
    priority: string;
    comments: Array<string>;
    other_data: OtherData;
    created_at: string;
    updated_at: string;
};

export type ContactRow = {
    id: string;
    customer_id: string;
    user_id: string;
    name: string;
    email: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
};

export type SheetRow = {
    id: string;
    user_id: string;
    name: string;
    description: string | null;
    customer_ids: Array<string>;
    created_at: string;
    updated_at: string;
};

// Converter Functions
/**
 * Converts a database CustomerRow to a Customer entity
 * @param {CustomerRow} row - Database row with snake_case fields
 * @returns {Customer} Customer entity with camelCase fields
 */
export function toCustomer(row: CustomerRow): Customer {
    return {
        id: row.id,
        userId: row.user_id,
        name: row.name,
        addresses: row.addresses,
        type: row.type,
        contacts: row.contacts,
        containerType: row.container_type,
        status: row.status,
        lastCommunication: row.last_communication,
        priority: row.priority,
        comments: row.comments,
        otherData: row.other_data,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

/**
 * Converts a database ContactRow to a Contact entity
 * @param {ContactRow} row - Database row with snake_case fields
 * @returns {Contact} Contact entity with camelCase fields
 */
export function toContact(row: ContactRow): Contact {
    return {
        id: row.id,
        customerId: row.customer_id,
        userId: row.user_id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

/**
 * Converts a database SheetRow to a Sheet entity
 * @param {SheetRow} row - Database row with snake_case fields
 * @returns {Sheet} Sheet entity with camelCase fields
 */
export function toSheet(row: SheetRow): Sheet {
    return {
        id: row.id,
        userId: row.user_id,
        name: row.name,
        description: row.description,
        customerIds: row.customer_ids,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
