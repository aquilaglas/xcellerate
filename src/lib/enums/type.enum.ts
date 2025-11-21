export enum TypeEnum {
    BAR = 'bar',
    RESTAURANT = 'restaurant',
    CAVE = 'cave',
    FESTIVAL = 'festival',
    INCONNU = 'inconnu'
}

export const TypeColorMap: Record<string, string | null> = {
    [TypeEnum.BAR]: null,
    [TypeEnum.RESTAURANT]: null,
    [TypeEnum.CAVE]: null,
    [TypeEnum.FESTIVAL]: null,
    [TypeEnum.INCONNU]: '--color-gray-500'
};
