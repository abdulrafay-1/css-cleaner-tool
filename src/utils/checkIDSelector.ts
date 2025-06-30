// Check ID selectors
export function checkIdSelectors(selector: string, usedIds: Set<string>): boolean {
    const idMatches: RegExpMatchArray | null = selector.match(/#([a-zA-Z_-][a-zA-Z0-9_-]*)/g);
    if (!idMatches) return false;

    return idMatches.some((match: string) => {
        const idName: string = match.substring(1);
        return usedIds.has(idName);
    });
}