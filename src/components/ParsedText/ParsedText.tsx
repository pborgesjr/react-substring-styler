import React from "react";
import { parseText } from "../../utils";
import { PatternShape, TextProps } from "../../types";
import { PATTERNS } from "../../constants";

export interface ParsedTextProps extends TextProps {
  patterns?: PatternShape[];
  childrenProps?: TextProps;
}

export const ParsedText: React.FC<ParsedTextProps> = ({
  patterns = [],
  childrenProps = [],
  style: globalStyle,
  children,
  testID,
  ...rest
}) => {
  const getPatterns = () => {
    return patterns?.map((option) => {
      const { type, ...patternOption } = option;

      if (type) {
        if (!PATTERNS[type].pattern) {
          throw new Error(`${option.type} it is not a default supported type.`);
        }
        patternOption.pattern = PATTERNS[type].pattern;
        patternOption.renderText = PATTERNS[type].renderText;
      }

      return patternOption;
    });
  };

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
