// Clean selector string with type safety
export function cleanSelectorString(selector: string): string {
    return selector
        .replace(/&/g, '') // Remove parent selectors
        .replace(/::?[\w-]+(\([^)]*\))?/g, '') // Remove pseudo-elements/classes
        .replace(/\[[^\]]+\]/g, '') // Remove attribute selectors
        .trim();
}
