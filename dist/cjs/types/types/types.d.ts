/// <reference types="react" />
export type DefaultPattern =
  | "url"
  | "phone"
  | "email"
  | "curlyBrackets"
  | "squareBrackets";
export type TextProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
export type PatternShape = {
  type?: DefaultPattern;
  pattern: RegExp;
  matchCountLimit?: number;
  renderText?: (matchingString: string, matches: string[]) => string;
  onClick?: () => void;
  onLongPress?: () => void;
} & TextProps;
