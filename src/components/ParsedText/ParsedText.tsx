import React from "react";
import { parseText } from "../../utils";
import { PatternShape, TextProps } from "../../types";
import { PATTERNS } from "../../constants";

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
export const ParsedText: React.FC<ParsedTextProps> = ({
  patterns = [],
  childrenProps = [],
  style: globalStyle,
  children,
  testID,
  ...rest
}) => {
  const getPatterns = () =>
    patterns
      ?.map((option) => {
        const { type, ...patternOption } = option;

        if (type) {
          if (!PATTERNS[type]?.pattern) {
            return;
          }
          patternOption.pattern = PATTERNS[type].pattern;
          patternOption.renderText = PATTERNS[type].renderText;
        }

        return patternOption;
      })
      .filter((current) => current !== undefined) as PatternShape[];

  const renderParsedText = () => {
    if (!patterns || typeof children !== "string" || patterns.length === 0) {
      return children;
    }

    const parsedSubstrings = parseText({
      text: children,
      patterns: getPatterns(),
    });

    return parsedSubstrings?.map((props, index) => {
      const { style: substringStyle, testID, ...extractionRest } = props;

      return (
        <span
          key={`parsedText-${index}`}
          style={{ ...globalStyle, ...substringStyle }}
          data-testid={testID}
          {...childrenProps}
          {...extractionRest}
        />
      );
    });
  };

  return (
    <span style={globalStyle} data-testid={testID} {...rest}>
      {renderParsedText()}
    </span>
  );
};
