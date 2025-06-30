import { checkClassSelectors } from "./checkClassSelectors";
import { checkIdSelectors } from "./checkIDSelector";
import { cleanSelectorString } from "./cleanSelectorString";
import { isElementOrUniversalSelector } from "./isElementOrUniversalSelector";

// Check rule selectors with type safety
export function checkRuleSelectors(
    rule: string,
    usedClasses: Set<string>,
    usedIds: Set<string>
): boolean {
    const selectorPart: string = rule.split('{')[0];
    if (!selectorPart) return false;

    const selectors: string[] = selectorPart.split(',').map((s: string) => s.trim());

    return selectors.some((selector: string) => {
        const cleanSelector: string = cleanSelectorString(selector);

        return (
            checkClassSelectors(cleanSelector, usedClasses) ||
            checkIdSelectors(cleanSelector, usedIds) ||
            isElementOrUniversalSelector(selector)
        );
    });
}