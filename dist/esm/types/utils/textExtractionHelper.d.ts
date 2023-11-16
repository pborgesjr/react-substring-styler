import { CSSProperties } from "react";
import type { PatternShape } from "../types";
type TextExtractionHelperParams = {
  text: string;
  patterns: PatternShape[];
};
type ParsedTextType = {
  children: string;
  match?: boolean;
  style?: CSSProperties;
};
export declare const textExtractionHelper: ({
  text,
  patterns,
}: TextExtractionHelperParams) => {
  patterns: () => ParsedTextType[];
  getMatchedPart: (
    matchedPattern: PatternShape,
    textPart: string,
    matches: RegExpExecArray,
    index: number
  ) => {
    children: string;
    match: boolean;
  };
};
export {};
