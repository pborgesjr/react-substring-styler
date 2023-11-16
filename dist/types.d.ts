import React$1, { CSSProperties } from "react";

type DefaultPattern =
  | "url"
  | "phone"
  | "email"
  | "curlyBrackets"
  | "squareBrackets";
type TextProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
type PatternShape = {
  type?: DefaultPattern;
  pattern: RegExp;
  matchCountLimit?: number;
  renderText?: (matchingString: string, matches: string[]) => string;
  onClick?: () => void;
  onLongPress?: () => void;
} & TextProps;

interface ParsedTextProps extends TextProps {
  patterns?: PatternShape[];
  childrenProps?: TextProps;
}
declare const ParsedText: React$1.FC<ParsedTextProps>;

declare const PATTERNS: Record<DefaultPattern, RegExp>;

type TextExtractionHelperParams = {
  text: string;
  patterns: PatternShape[];
};
type ParsedTextType = {
  children: string;
  match?: boolean;
  style?: CSSProperties;
};
declare const textExtractionHelper: ({
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

export {
  type DefaultPattern,
  PATTERNS,
  type PatternShape,
  ParsedText,
  type TextProps,
  textExtractionHelper,
};
