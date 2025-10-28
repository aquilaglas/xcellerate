import type {Row} from "$lib/types/xls.types.js";

export type Customer = {
    id: string,
    name: string,
    addresses: Array<string>,
    type: string,
    contacts: Array<Contact>, // @TODO
    containerType: string,
    status: string,
    lastCommunication: string | null,
    priority: string,
    comments: Array<Comment>, // @TODO
    otherData: Row,
};

export type Contact = {
    customerId: string,
    name: string,
    email: string | null,
    phone: string | null,
};

export const priorityMap: Record<number, string> = {
    1: 'urgent',
    2: 'important',
    3: 'moyen',
    4: 'faible',
    5: 'aucune',
};
export const priorityColorOptions = {
    urgent: '--color-red-500',
    important: '--color-orange-500',
    moyen: '--color-yellow-500',
    faible: '--color-green-500',
    aucune: '--color-gray-500'
};

export const typeColorOptions = {
    bar: null,
    restaurant: null,
    cave: null,
    festival: null,
    inonnu: '--color-gray-500',
};

export const containerTypeColorOptions = {
    casier: '--color-blue-500',
    carton: '--color-amber-900',
    inconnu: '--color-gray-500',
};

export const statusColorOptions = {
    'en cours': '--color-green-500',
    finis: '--color-blue-500',
    attente: '--color-orange-500',
    mort: '--color-red-500',
    aucun: '--color-gray-500',
};

export type Comment = {
    text: string,
}
