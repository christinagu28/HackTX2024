const max = 102;

// was this rly necessary
function hashName(username: string) {
    return (((Array.from(username).reduce((hash, char) =>
        char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash, 0) % max) + max) % max);
}

export function getIconFor(username: string): string {
    let hash = hashName(username);
    return `icons/${hash}.png`;
}