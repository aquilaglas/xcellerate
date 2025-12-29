import {
    containerTypeOrder,
    priorityOrder, type SearchParams, type SortDirection,
    statusOrder,
    typeOrder
} from "$lib/types/filter-sort.types.js";
import type {Customer} from "$lib/types/models.js";

export function toggleSort(field: string, params: SearchParams) {
    const sortField = (params['sortField'] ?? 'name') as keyof Customer;
    const sortDirection = params['sortDirection'] ?? 'asc';

    if (sortField === field) {
        sortDirection === 'asc' ? params['sortDirection'] = 'desc' : params['sortDirection'] = 'asc';
        return params;
    } else {
        params['sortField'] = field;
        params['sortDirection'] = 'asc';
        return params;
    }
}

export const filterAndSortCustomers = (customers: Customer[], params: SearchParams) => {
    let filtered = [...customers];

    // FILTRES MULTI-CHAMPS (logique AND)

    // Filtre par nom (recherche texte)
    if (params['name']) {
        const searchTerm = params['name'].toLowerCase();
        filtered = filtered.filter(customer =>
            customer.name?.toLowerCase().includes(searchTerm)
        );
    }

    // Filtre par type
    if (params['type']) {
        filtered = filtered.filter(customer =>
            customer.type?.toLowerCase() === params['type']?.toLowerCase()
        );
    }

    // Filtre par containerType
    if (params['containerType']) {
        filtered = filtered.filter(customer =>
            customer.containerType?.toLowerCase() === params['containerType']?.toLowerCase()
        );
    }

    // Filtre par priority
    if (params['priority']) {
        filtered = filtered.filter(customer =>
            customer.priority?.toLowerCase() === params['priority']?.toLowerCase()
        );
    }

    // Filtre par status
    if (params['status']) {
        filtered = filtered.filter(customer =>
            customer.status?.toLowerCase() === params['status']?.toLowerCase()
        );
    }

    // Support de l'ancien paramètre 'search' pour compatibilité
    if (params['search']) {
        const searchTerm = params['search'].toLowerCase();
        const sortField = (params['sortField'] ?? 'name') as keyof Customer;
        filtered = filtered.filter(customer => {
            const value = customer[sortField];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchTerm);
            }
            return false;
        });
    }

    // TRI
    const sortField = (params['sortField'] ?? 'name') as keyof Customer;
    const sortDirection = (params['sortDirection'] ?? 'asc') as SortDirection;

    filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortField) {
            case 'name':
                aValue = a.name?.toLowerCase() || '';
                bValue = b.name?.toLowerCase() || '';
                break;
            case 'type':
                aValue = typeOrder[a.type?.toLowerCase() || ''] || 999;
                bValue = typeOrder[b.type?.toLowerCase() || ''] || 999;
                break;
            case 'containerType':
                aValue = containerTypeOrder[a.containerType?.toLowerCase() || ''] || 999;
                bValue = containerTypeOrder[b.containerType?.toLowerCase() || ''] || 999;
                break;
            case 'priority':
                aValue = priorityOrder[a.priority?.toLowerCase() || ''] || 999;
                bValue = priorityOrder[b.priority?.toLowerCase() || ''] || 999;
                break;
            case 'status':
                aValue = statusOrder[a.status?.toLowerCase() || ''] || 999;
                bValue = statusOrder[b.status?.toLowerCase() || ''] || 999;
                break;
            case 'lastCommunication':
                aValue = a.lastCommunication ? new Date(a.lastCommunication).getTime() : 0;
                bValue = b.lastCommunication ? new Date(b.lastCommunication).getTime() : 0;
                break;
            default:
                return 0;
        }
        if (typeof aValue === "string" && typeof bValue === "string") {
            const compareResult = aValue.localeCompare(bValue, 'fr', {
                numeric: true,
                sensitivity: 'base'
            });
            return sortDirection === 'asc' ? compareResult : -compareResult;
        } else {
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return filtered;
};
