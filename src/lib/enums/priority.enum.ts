export enum PriorityEnum {
    URGENT = 'urgent',
    IMPORTANT = 'important',
    MOYEN = 'moyen',
    FAIBLE = 'faible',
    AUCUNE = 'aucune'
}

export const PriorityColorMap: Record<string, string> = {
    [PriorityEnum.URGENT]: '--color-red-500',
    [PriorityEnum.IMPORTANT]: '--color-orange-500',
    [PriorityEnum.MOYEN]: '--color-yellow-500',
    [PriorityEnum.FAIBLE]: '--color-green-500',
    [PriorityEnum.AUCUNE]: '--color-gray-500',
};

export const PrioritySortMap: Record<number, string> = {
    1: PriorityEnum.URGENT,
    2: PriorityEnum.IMPORTANT,
    3: PriorityEnum.MOYEN,
    4: PriorityEnum.FAIBLE,
    5: PriorityEnum.AUCUNE,
};
