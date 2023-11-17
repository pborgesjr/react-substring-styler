/// <reference types="react" />
export type DefaultPattern = "url" | "email" | "curlyBrackets" | "squareBrackets";
export type TextProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & ParsedTextType;
export type PatternShape = {
    type?: DefaultPattern;
    pattern?: RegExp;
    renderText?: (matchingString: string, matches: string[]) => string;
} & TextProps;
export type ParseTextFnParams = {
    text: string;
    patterns: PatternShape[];
};
type ParsedTextType = {
    testID?: string;
    children?: string;
    match?: boolean;
};
export {};
