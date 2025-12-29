export function formatDateFr(dateString: string | null | undefined): string {
    if (!dateString) return '?';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate();
    const monthNames = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}
