import type { ParserState } from "../types/ParseState";
import { formatRule } from "./formatRule";
import { shouldKeepRule } from "./shouldKeepRule";

export function processLine(
    line: string,
    state: ParserState,
    rules: string[],
    usedClasses: Set<string>,
    usedIds: Set<string>
): void {
    for (let j = 0; j < line.length; j++) {
        const char: string = line[j];
        const nextChar: string | undefined = line[j + 1];

        // Handle comments
        if (!state.inString && char === '/' && nextChar === '*') {
            state.inComment = true;
            state.currentRule += char;
            continue;
        }

        if (state.inComment && char === '*' && nextChar === '/') {
            state.inComment = false;
            state.currentRule += char;
            continue;
        }

        if (state.inComment) {
            state.currentRule += char;
            continue;
        }

        // Handle strings
        if (!state.inComment && (char === '"' || char === "'")) {
            if (!state.inString) {
                state.inString = true;
                state.stringChar = char;
            } else if (char === state.stringChar) {
                state.inString = false;
                state.stringChar = '';
            }
        }

        if (!state.inComment && !state.inString) {
            if (char === '{') {
                state.braceLevel++;
                if (!state.inRule) {
                    state.inRule = true;
                }
            } else if (char === '}') {
                state.braceLevel--;
                if (state.braceLevel === 0 && state.inRule) {
                    // End of rule - process it
                    state.currentRule += char;

                    if (shouldKeepRule(state.currentRule, usedClasses, usedIds)) {
                        rules.push(formatRule(state.currentRule));
                    }

                    state.currentRule = '';
                    state.inRule = false;
                    continue;
                }
            }
        }

        state.currentRule += char;
    }

    if (!state.inRule || state.braceLevel === 0) {
        state.currentRule += '\n';
    }
}