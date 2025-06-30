// Check at-rules for used selectors
export function checkAtRuleForUsedSelectors(
    rule: string,
    usedClasses: Set<string>,
    usedIds: Set<string>
): boolean {
    const hasUsedClass: boolean = Array.from(usedClasses).some((cls: string) =>
        rule.includes(`.${cls}`) || rule.includes(`&.${cls}`)
    );

    const hasUsedId: boolean = Array.from(usedIds).some((id: string) =>
        rule.includes(`#${id}`)
    );

    return hasUsedClass || hasUsedId;
}