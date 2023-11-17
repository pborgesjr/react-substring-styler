import React from "react";
import { PatternShape, TextProps } from "../../types";
export interface ParsedTextProps extends TextProps {
    patterns?: PatternShape[];
    childrenProps?: TextProps;
}
/**
 * @param patterns - An array of PatternShape objects. Each object represents a pattern to be parsed within the main string.
 * @param style - The style applied to the entire string.
 * @param testID - The value applied to the 'span' element wrapping the entire text and all substrings.
 * @param attributes - It's possible to pass any attribute from the span element.
 */
export declare const ParsedText: React.FC<ParsedTextProps>;
