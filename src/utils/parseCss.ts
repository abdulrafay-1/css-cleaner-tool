import type { ParserState } from "../types/ParseState";
import { processLine } from "./processLine";

export function parseAdvancedCSS(
    cssContent: string,
    usedClasses: Set<string>,
    usedIds: Set<string>
): string[] {
    const rules: string[] = [];
    const lines: string[] = cssContent.split('\n');

    const state: ParserState = {
        currentRule: '',
        braceLevel: 0,
        inRule: false,
        inComment: false,
        inString: false,
        stringChar: '',
        nestedLevel: 0,
        lineNumber: 0
    };

    for (let i = 0; i < lines.length; i++) {
        const line: string = lines[i];
        state.lineNumber = i + 1;

        processLine(line, state, rules, usedClasses, usedIds);
    }

    return rules;
}