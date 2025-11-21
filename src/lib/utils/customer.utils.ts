import {browser} from "$app/environment";
import type {Customer} from "$lib/types/models.js";
import {PriorityEnum, PrioritySortMap} from "$lib/enums/priority.enum.js";
import type {CustomerCreateDTO} from "$lib/dto/customer-create.dto.js";
import {StatusEnum} from "$lib/enums/status.enum.js";
import {ContainerTypeEnum} from "$lib/enums/container-type.enum.js";
import {TypeEnum} from "$lib/enums/type.enum.js";

export const createCustomer = async (customer: CustomerCreateDTO, sheetId: string): Promise<Response> => {
    if (!browser) return new Response(JSON.stringify({ error: 'Error domain' }), {status: 500});

    return await fetch(`/api/sheets/${sheetId}/customers`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    })
};

export const updateCustomer = async (customer: Partial<Customer>, customerId: string): Promise<Response> => {
    if (!browser) return new Response(JSON.stringify({ error: 'Error domain' }), {status: 500});

    return await fetch('/api/customers/' + customerId, {
        method: 'PUT',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer),
    });
};

export const deleteCustomer = async (customerId: string): Promise<Response> => {
    if (!browser) return new Response(JSON.stringify({ error: 'Error domain' }), {status: 500});

    return await fetch('/api/customers/' + customerId, {
        method: 'DELETE',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
    });
};

export function createDefaultCustomer(): CustomerCreateDTO {
    return {
        name: "",
        addresses: [],
        type: TypeEnum.INCONNU,
        contacts: [],
        containerType: ContainerTypeEnum.INCONNU,
        status: StatusEnum.AUCUN,
        lastCommunication: null,
        priority: PriorityEnum.AUCUNE,
        comments: [],
        otherData: {}
    };
}

const FIELD_MAP: Record<string, keyof CustomerCreateDTO | "otherData"> = {
    "nom": "name",
    "name": "name",

    "adresses": "addresses",
    "adresse": "addresses",

    "type": "type",

    "type de contenant": "containerType",
    "casier/carton": "containerType",

    "statut": "status",

    "date dernier contact": "lastCommunication",
    "last communication": "lastCommunication",

    "priorité": "priority",

    "commentaire": "comments",
    "commentaires": "comments",

    "contact": "contacts",
    "contacts": "contacts"
};

export function formatCustomer(row: Record<string, any>): CustomerCreateDTO {
    const customer = createDefaultCustomer();

    for (const [rawKey, value] of Object.entries(row)) {
        const key = rawKey.trim().toLowerCase();
        const mappedField = FIELD_MAP[key];

        if (!mappedField) {
            customer.otherData[rawKey] = cleanValue(value);
            continue;
        }

        switch (mappedField) {
            case "addresses":
            case "contacts":
            case "comments":
                customer[mappedField] = parseListValue(value);
                break;

            case "priority":
                customer.priority = normalizePriority(value);
                break;

            case "lastCommunication":
                if (typeof value === 'number') {
                    const jsDate = new Date((value - 25569) * 86400 * 1000);
                    customer.lastCommunication = jsDate.toISOString();
                } else if (typeof value === 'string' && value.trim() !== '') {
                    customer.lastCommunication = new Date(value).toISOString();
                } else {
                    customer.lastCommunication = null;
                }
                break;

            default:
                if (mappedField !== "otherData") {
                    customer[mappedField] = cleanValue(value);
                }
                break;
        }
    }

    return customer;
}

function cleanValue(value: any): string {
    return value ? String(value).trim() : "";
}

function parseListValue(value: any): string[] {
    if (!value) return [];
    if (typeof value !== "string") return [];

    return value
        .split("\n")
        .map(v => v.trim())
        .filter(Boolean);
}

function normalizePriority(value: any): string {
    if (!value) return PriorityEnum.AUCUNE;

    if (typeof value === "number")
        return PrioritySortMap[value] as PriorityEnum;

    const priority = String(value).trim().toUpperCase();

    if (priority in PriorityEnum) {
        return priority as PriorityEnum;
    }

    return PriorityEnum.AUCUNE;
}
