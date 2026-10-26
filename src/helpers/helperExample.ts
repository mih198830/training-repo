export function formatStatus(name: string, active: boolean): string {
    return `${name}: ${active ? 'ACTIVE' : 'INACTIVE'}`;
}
