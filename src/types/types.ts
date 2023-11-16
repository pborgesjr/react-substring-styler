import { CSSProperties } from "react";

export type DefaultPattern =
  | "url"
  | "email"
  | "curlyBrackets"
  | "squareBrackets";

export type TextProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  testID?: string;
};

export type PatternShape = {
  type?: DefaultPattern;
  pattern?: RegExp;
  matchCountLimit?: number;
  renderText?: (matchingString: string, matches: string[]) => string;
  onClick?: () => void;
} & TextProps;

export type TextExtractionHelperParams = {
  text: string;
  patterns: PatternShape[];
};

export type ParsedTextType = {
  children: string;
  match?: boolean;
  style?: CSSProperties;
  testID?: string;
};
