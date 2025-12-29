export enum StatusEnum {
    EN_COURS = 'en cours',
    FINIS = 'finis',
    ATTENTE = 'attente',
    MORT = 'mort',
    AUCUN = 'aucun'
}

export const StatusColorMap: Record<StatusEnum, string> = {
    [StatusEnum.EN_COURS]: '--color-green-500',
    [StatusEnum.FINIS]: '--color-blue-500',
    [StatusEnum.ATTENTE]: '--color-orange-500',
    [StatusEnum.MORT]: '--color-red-500',
    [StatusEnum.AUCUN]: '--color-gray-500'
};
