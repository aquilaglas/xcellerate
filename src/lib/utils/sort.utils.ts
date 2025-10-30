import {
    containerTypeOrder,
    priorityOrder,
    type SortDirection,
    type SortField,
    statusOrder,
    typeOrder
} from "$lib/types/sort.types.js";
import type {Customer} from "$lib/types/customer.types.js";

export function toggleSort(field: string, sortField: SortField, sortDirection: SortDirection) {
    if (sortField === field) {
        if (sortDirection === 'asc') {
            return {
                field: sortField,
                direction: 'desc'
            }
        } else if (sortDirection === 'desc') {
            return {
                field: sortField,
                direction: 'asc'
            }
        }
    } else {
        return {
            field,
            direction: 'asc'
        }
    }
}

export const sortCustomers = (customers: Customer[], sortField: SortField, sortDirection: SortDirection) => {
    if (!sortField || !sortDirection) {
        return customers;
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