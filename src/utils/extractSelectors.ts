
interface ExtractionPattern {
    regex: RegExp;
    extractorFn: (match: RegExpMatchArray) => string[];
}

export function extractSelectorsAdvanced(htmlContent: string): {
    usedClasses: Set<string>;
    usedIds: Set<string>;
} {
    const usedClasses = new Set<string>();
    const usedIds = new Set<string>();

    // Type-safe extraction patterns
    const classPatterns: ExtractionPattern[] = [
        {
            regex: /class\s*=\s*["']([^"']*)["']/g,
            extractorFn: (match: RegExpMatchArray): string[] =>
                (match[1] || '').split(/\s+/).filter(Boolean)
        },
        {
            regex: /className\s*=\s*["']([^"']*)["']/g,
            extractorFn: (match: RegExpMatchArray): string[] =>
                (match[1] || '').split(/\s+/).filter(Boolean)
        },
        {
            regex: /className\s*=\s*{`([^`]*)`}/g,
            extractorFn: (match: RegExpMatchArray): string[] => {
                const classString = match[1] || '';
                return classString
                    .replace(/\$\{[^}]*\}/g, '')
                    .replace(/\{[^}]*\}/g, '')
                    .split(/\s+/)
                    .filter((cls: string) => cls && !cls.includes('${') && !cls.includes('{'));
            }
        },
        {
            regex: /:class\s*=\s*["']([^"']*)["']/g,
            extractorFn: (match: RegExpMatchArray): string[] =>
                (match[1] || '').split(/\s+/).filter(Boolean)
        },
        {
            regex: /\[class\]\s*=\s*["']([^"']*)["']/g,
            extractorFn: (match: RegExpMatchArray): string[] =>
                (match[1] || '').split(/\s+/).filter(Boolean)
        },
        {
            regex: /@apply\s+([^;"\n]*)/g,
            extractorFn: (match: RegExpMatchArray): string[] =>
                (match[1] || '').split(/\s+/).filter(Boolean)
        }
    ];

    // Extract classes using patterns
    classPatterns.forEach(({ regex, extractorFn }: ExtractionPattern) => {
        let match: RegExpMatchArray | null;
        while ((match = regex.exec(htmlContent)) !== null) {
            const classes: string[] = extractorFn(match);
            classes.forEach((cls: string) => usedClasses.add(cls));
        }
    });

    // Extract IDs with type safety
    const idPattern: RegExp = /id\s*=\s*["']([^"']*)["']/g;
    let idMatch: RegExpMatchArray | null;
    while ((idMatch = idPattern.exec(htmlContent)) !== null) {
        if (idMatch[1]) {
            usedIds.add(idMatch[1]);
        }
    }

    return { usedClasses, usedIds };
}