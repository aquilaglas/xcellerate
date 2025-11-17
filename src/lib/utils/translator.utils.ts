export const translate = (word: string, translatorOptions: {
    isFeminine?: boolean,
    isPlural?: boolean,
    withDeterminant?: boolean
} | undefined = {
    isFeminine: false,
    isPlural: false,
    withDeterminant: false
}): string => {
    let translated: string;
    let determinant: string = '';

    if (dictionary[word]) {
        translated = dictionary[word];
    } else {
        translated = word;
    }

    if (translatorOptions.withDeterminant) {
        if (translatorOptions.isPlural) {
            determinant = 'des ';
        } else {
            determinant = translatorOptions.isFeminine ? 'une ' : 'un '
        }
    }

    return determinant + translated + (translatorOptions.isPlural ? 's' : '');
}

const dictionary: Record<string, string> = {
    name: "nom",
    address: "adresse",
    type: "type",
    containerType: "contenant",
    priority: "priorité",
    status: "statut",
    lastCommunication: "dernière communication",
}


