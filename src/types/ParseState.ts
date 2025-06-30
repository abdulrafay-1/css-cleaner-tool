export interface ParserState {
    currentRule: string;
    braceLevel: number;
    inRule: boolean;
    inComment: boolean;
    inString: boolean;
    stringChar: string;
    nestedLevel: number;
    lineNumber: number;
}
