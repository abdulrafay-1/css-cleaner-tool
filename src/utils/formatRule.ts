// Format rule with type safety
export function formatRule(rule: string): string {
    return rule
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0)
        .join('\n')
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/;\s*/g, ';\n  ')
        .replace(/\s*}\s*/g, '\n}')
        .replace(/\n\s*\n/g, '\n');
}