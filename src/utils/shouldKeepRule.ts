import { checkAtRuleForUsedSelectors } from "./checkRuleForUsedSelectors";
import { checkRuleSelectors } from "./checkRuleSelector";

export function shouldKeepRule(
    rule: string,
    usedClasses: Set<string>,
    usedIds: Set<string>
): boolean {
    // SCSS features that should always be kept
    const scssFeatures: RegExp[] = [
        /^\s*\$[\w-]+\s*:/, // Variables
        /^\s*@mixin\s+[\w-]+/, // Mixins
        /^\s*@function\s+[\w-]+/, // Functions
        /^\s*@import/, // Imports
        /^\s*@use/, // Use statements
        /^\s*@forward/ // Forward statements
    ];

    const hasScssFeature: boolean = scssFeatures.some((pattern: RegExp) =>
        pattern.test(rule)
    );

    if (hasScssFeature) return true;

    // Handle at-rules
    if (rule.match(/^\s*@(media|supports|document|keyframes|page)/)) {
        return checkAtRuleForUsedSelectors(rule, usedClasses, usedIds);
    }

    // Extract and check selectors
    return checkRuleSelectors(rule, usedClasses, usedIds);
}