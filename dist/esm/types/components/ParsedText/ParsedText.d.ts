import React from "react";
import { PatternShape, TextProps } from "../../types";
interface ParsedTextProps extends TextProps {
  patterns?: PatternShape[];
  childrenProps?: TextProps;
}
export declare const ParsedText: React.FC<ParsedTextProps>;
export {};
