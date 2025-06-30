// Check class selectors
export function checkClassSelectors(selector: string, usedClasses: Set<string>): boolean {
    const classMatches: RegExpMatchArray | null = selector.match(/\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g);
    if (!classMatches) return false;

    return classMatches.some((match: string) => {
        const className: string = match.substring(1);
        return usedClasses.has(className);
    });
}