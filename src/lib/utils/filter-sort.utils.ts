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
        delete params['search'];
        return params;
    }
}

export const filterAndSortCustomers = (customers: Customer[], params: SearchParams) => {
    const sortField = (params['sortField'] ?? 'name') as keyof Customer;
    const sortDirection = (params['sortDirection'] ?? 'asc') as SortDirection;
    const search = params['search'] ?? '';

    if (search !== '') {
        customers = customers.filter(customer => {
            if (typeof customer[sortField] === 'string') {
                return customer[sortField].toLowerCase().includes(search.toLowerCase());
            }
        });
    }

    customers.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortField) {
            case 'name':
                aValue = a.name?.toLowerCase() || '';
                bValue = b.name?.toLowerCase() || '';
                break;
            case 'type':
                aValue = typeOrder[a.priority?.toLowerCase() || ''] || 999;
                bValue = typeOrder[b.priority?.toLowerCase() || ''] || 999;
                break;
            case 'containerType':
                aValue = containerTypeOrder[a.priority?.toLowerCase() || ''] || 999;
                bValue = containerTypeOrder[b.priority?.toLowerCase() || ''] || 999;
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

    return customers;
};
