function hash(s: string, max_val: number) {
    return (
        ((s.split("").reduce((hash, char) => {
                    return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
                }, 0) %
                max_val) +
            max_val) %
        max_val
    );
}

function icon_url(s: string) {
    return `icons/${hash(s, 102)}.png`;
}

export {icon_url};
