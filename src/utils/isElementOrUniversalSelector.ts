// Check if selector is element or universal
export function isElementOrUniversalSelector(selector: string): boolean {
    return Boolean(selector.match(/^[a-zA-Z]+[\w-]*$/) || selector.includes('*'));
}