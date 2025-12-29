export enum ContainerTypeEnum {
    CASIER = 'casier',
    CARTON = 'carton',
    INCONNU = 'inconnu'
}

export const ContainerTypeColorMap: Record<ContainerTypeEnum, string> = {
    [ContainerTypeEnum.CASIER]: '--color-blue-500',
    [ContainerTypeEnum.CARTON]: '--color-amber-900',
    [ContainerTypeEnum.INCONNU]: '--color-gray-500'
};
