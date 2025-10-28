export type SortField = 'name' | 'type' | 'containerType' | 'priority' | 'status' | 'lastCommunication';

export type SortDirection = 'asc' | 'desc';

export const typeOrder: Record<string, number> = {
    'festival': 1,
    'bar': 2,
    'restaurant': 3,
    'cave': 4,
    'inconnu': 5,
};

export const containerTypeOrder: Record<string, number> = {
    'casier': 1,
    'carton': 3,
    'inconnu': 2,
};

export const priorityOrder: Record<string, number> = {
    'urgent': 1,
    'important': 2,
    'moyen': 3,
    'faible': 4,
    'aucune': 5,
};

export const statusOrder: Record<string, number> = {
    'en cours': 1,
    'attente': 3,
    'finis': 2,
    'aucun': 4,
    'mort': 5,
};
