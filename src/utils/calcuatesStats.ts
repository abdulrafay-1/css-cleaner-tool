// Calculate statistics with type safety
interface CSSCleaningStats {
    originalRules: number;
    cleanedRules: number;
    removedRules: number;
    processingTime: number;
    reductionPercentage: number;
}


export function calculateStats(
    originalCss: string,
    cleanedRules: string[],
    processingTime: number
): CSSCleaningStats {
    const originalRules: number = countCSSRules(originalCss);
    const cleanedRuleCount: number = cleanedRules.length;
    const removedRules: number = originalRules - cleanedRuleCount;
    const reductionPercentage: number = originalRules > 0
        ? Math.round((removedRules / originalRules) * 100)
        : 0;

    return {
        originalRules,
        cleanedRules: cleanedRuleCount,
        removedRules,
        processingTime,
        reductionPercentage
    };
}


function countCSSRules(css: string): number {
    const matches: RegExpMatchArray | null = css.match(/{[^{}]*}/g);
    return matches ? matches.length : 0;
}

export function formatResult(rules: string[], stats: CSSCleaningStats): string {
    const statsComment: string = `/*
=== CSS Cleaning Results ===
Original rules: ${stats.originalRules}
Cleaned rules: ${stats.cleanedRules}
Removed rules: ${stats.removedRules}
Processing time: ${stats.processingTime}ms
Reduction: ${stats.reductionPercentage}%
=== End Results ===
*/\n\n`;

    const result: string = rules.join('\n\n');
    return statsComment + (result || '/* No matching CSS rules found */');
}
