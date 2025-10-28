import type {Row} from "$lib/types/xls.types.js";
import {browser} from "$app/environment";
import {type Customer, priorityMap} from "$lib/types/customer.types.js";

export const createCustomer = async (customer: Customer): Promise<Response> => {
    if (!browser) return new Response(JSON.stringify({ error: 'Error domain' }), {status: 500});

    return await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    })
};

export const updateCustomer = async (customer: Customer): Promise<Response> => {
    if (!browser) return new Response(JSON.stringify({ error: 'Error domain' }), {status: 500});

    return await fetch('/api/customers/' + customer.id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer),
    });
};

export const formatCustomer = (row: Row): Customer => {
    const customer: Customer = createDefaultCustomer();

    Object.entries(row).forEach(([key, value]) => {
        const {formattedKey, formattedValue} = getFormattedKeyAndValue(key, value);

        if (formattedKey === 'otherData') {
            customer.otherData[formattedValue.key] = formattedValue.value;
        } else {
            // @ts-ignore
            customer[formattedKey] = formattedValue;
        }
    })

    return customer;
}

export const createDefaultCustomer = (): Customer => {
    return {
        id: '',
        name: '',
        addresses: [],
        type: 'inconnu',
        contacts: [],
        containerType: 'inconnu',
        status: 'aucun',
        lastCommunication: null,
        priority: priorityMap[5],
        comments: [],
        otherData: {},
    } as Customer;
}

const getFormattedKeyAndValue = (key: string, value: any): {formattedKey: keyof Customer, formattedValue: any} => {
    let formattedKey: keyof Customer;
    let formattedValue;

    switch (key.toLowerCase()) {
        case 'id':
            formattedKey = key.toLowerCase() as keyof Customer;
            formattedValue = value;
            break;
        case 'nom':
            formattedKey = 'name';
            formattedValue = value;
            break;
        case 'adresses':
            formattedKey = 'addresses';
            formattedValue = value ? value.split('\n') : [];
            break;
        case 'type':
            formattedKey = 'type';
            formattedValue = value || 'inconnu';
            break;
        case 'casier /carton':
        case 'type de contenant':
            formattedKey = 'containerType';
            formattedValue = value || 'inconnu';
            break;
        case 'statut':
            formattedKey = 'status';
            formattedValue = value || 'aucun';
            break;
        case 'date dernier contact':
            formattedKey = 'lastCommunication';
            formattedValue = value;
            break;
        case 'priorité':
            formattedKey = 'priority';
            formattedValue = value ? priorityMap[value] || 'aucune'  : 'aucune';
            break;
        default:
            formattedKey = 'otherData';
            formattedValue = { key, value };
            break;
    }
    return {formattedKey: formattedKey, formattedValue: formattedValue};
}
